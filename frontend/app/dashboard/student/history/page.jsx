
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function StudentHistory() {
  const [history, setHistory] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) return;
    fetchHistory();
  }, [token]);

  const fetchHistory = () => {
    axios
      .get('http://localhost:5000/api/student/history', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHistory(res.data))
      .catch((err) => toast.error('Failed to load history'));
  };

  const clearHistory = async () => {
    const confirm = window.confirm('Are you sure you want to clear all history?');
    if (!confirm) return;

    try {
      await axios.delete('http://localhost:5000/api/student/history/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('History cleared');
      setHistory([]);
    } catch (err) {
      toast.error('Failed to clear history');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📘 Borrowing History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Clear All History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p>You have no returned books yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Borrowed At</th>
              <th className="border p-2">Returned At</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry._id}>
                <td className="border p-2">{entry.book?.title}</td>
                <td className="border p-2">{entry.book?.author}</td>
                <td className="border p-2">{new Date(entry.borrowedAt).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(entry.returnedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
