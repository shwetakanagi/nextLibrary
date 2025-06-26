'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function StaffProfile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Not authenticated');
      router.push('/login');
      return;
    }

    fetch('http://localhost:5000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        if (data.role !== 'staff') {
          toast.error('Access denied: Not a staff user');
          router.push('/login');
          return;
        }
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      })
      .catch(() => {
        localStorage.removeItem('token');
        toast.error('Failed to load profile. Please log in again.');
        router.push('/login');
      });
  }, [router]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Not authenticated');
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Update failed');
      }

      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    }
  };

  if (!user) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Staff Profile</h2>
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
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
