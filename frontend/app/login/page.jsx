'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      if (data.role === 'admin') router.push('/dashboard/admin');
      else if (data.role === 'staff') router.push('/dashboard/staff');
      else router.push('/dashboard/student');
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="w-full p-2 mb-2 border" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 mb-4 border" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
