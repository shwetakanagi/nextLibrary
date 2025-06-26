
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentProfile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('http://localhost:5000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT', // <-- use PUT, not PATCH
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name }) // add email if needed
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setUser(data.user);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert(error.message || 'Failed to update profile');
    }
  };

  if (!user) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Student Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Full Name</label>
          <input
            className="border p-2 w-full rounded"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Email Address</label>
          <input
            className="border p-2 w-full rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
      </div>
    </div>
  );
}
