// export default function ManageStudents() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Manage Students</h1>
//       <p className="mt-4">View student borrowing history and account info.</p>
//     </div>
//   );
// }


// components/StaffStudents.js
'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function StaffStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/staff/students', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📚 Staff Students Management</h1>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-4 text-center">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id} className="border-t">
                  <td className="p-2 border">{student.name}</td>
                  <td className="p-2 border">{student.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
