'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Signup successful!');
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input className="w-full p-2 mb-2 border" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full p-2 mb-2 border" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 mb-2 border" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select className="w-full p-2 mb-4 border" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
