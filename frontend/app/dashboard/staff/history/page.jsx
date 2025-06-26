'use client';
import { useEffect, useState } from 'react';

export default function StudentHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/history')
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">📖 Student History</h1>
      <ul>
        {history.map(record => (
          <li key={record.id} className="border p-3 my-2 rounded bg-white">
            <p>{record.studentName} borrowed <strong>{record.bookTitle}</strong></p>
            <p>Borrowed: {new Date(record.borrowedDate).toLocaleDateString()} | Returned: {record.returnedDate ? new Date(record.returnedDate).toLocaleDateString() : 'Not returned'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
