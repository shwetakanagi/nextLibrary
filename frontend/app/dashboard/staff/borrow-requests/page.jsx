
'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function StaffBorrowRequests() {
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBorrowRequests();
  }, []);

  const fetchBorrowRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/staff/borrow-requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBorrowRequests(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch borrow requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/staff/borrow-requests/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Borrow request approved ✅');
      fetchBorrowRequests();
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to approve request');
    }
  };

  const handleReturn = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/staff/borrow-requests/return/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Book marked as returned 📚');
      fetchBorrowRequests();
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to mark return');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📚 Staff Borrow Requests</h1>

      {loading ? (
        <p>Loading borrow requests...</p>
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
            {borrowRequests.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No borrow requests found.
                </td>
              </tr>
            ) : (
              borrowRequests.map((request) => (
                <tr key={request._id} className="border-t">
                  <td className="p-2 border">{request.user?.name || 'Unknown'}</td>
                  <td className="p-2 border">{request.book?.title || 'N/A'}</td>
                  <td className="p-2 border">
                    {new Date(request.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {request.returned ? 'Returned' : 'Pending'}
                  </td>
                  <td className="p-2 border">
                    {!request.returned && (
                      <>
                        <button
                          onClick={() => handleApprove(request._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReturn(request._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          Mark Returned
                        </button>
                      </>
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
