

'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function StaffReturns() {
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBorrowRecords();
  }, []);

  const fetchBorrowRecords = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/staff/returns', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBorrowRecords(response.data);
    } catch (error) {
      toast.error('Failed to fetch borrow records');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReturn = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/staff/returns/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Return approved and logged in history');
      fetchBorrowRecords();
    } catch (error) {
      toast.error('Failed to approve return');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📚 Staff Borrow Returns</h1>

      {loading ? (
        <p>Loading borrow records...</p>
      ) : (
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Book</th>
              <th className="p-2 border">Due Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowRecords.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No borrow records found.
                </td>
              </tr>
            ) : (
              borrowRecords.map((record) => (
                <tr key={record._id} className="border-t">
                  <td className="p-2 border">{record.user?.name || 'Unknown'}</td>
                  <td className="p-2 border">{record.book?.title || 'N/A'}</td>
                  <td className="p-2 border">
                    {new Date(record.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {record.returned ? 'Returned' : 'Pending'}
                  </td>
                  <td className="p-2 border">
                    {!record.returned && (
                      <button
                        onClick={() => handleApproveReturn(record._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Approve Return
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
