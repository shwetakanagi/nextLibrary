

'use client';

import { useRouter } from 'next/navigation';

export default function StudentLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ✅ Clear the auth token
    router.push('/'); // ✅ Redirect to login page
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">📚 Student Panel</h2>
          <nav className="space-y-2">
            <a href="/dashboard/student" className="block hover:underline">Dashboard</a>
            <a href="/dashboard/student/books" className="block hover:underline">Browse Books</a>
            <a href="/dashboard/student/borrowed" className="block hover:underline">Borrowed</a>
            <a href="/dashboard/student/history" className="block hover:underline">History</a>
            <a href="/dashboard/student/notifications" className="block hover:underline">Notifications</a>
            <a href="/dashboard/student/profile" className="block hover:underline">Profile</a>
          </nav>
        </div>

        {/* 🔒 Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  );
}
