'use client';

import { useRouter } from 'next/navigation';

export default function StaffLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">🛠️ Staff Panel</h2>
          <nav className="space-y-2">
            <a href="/dashboard/staff" className="block hover:underline">Dashboard</a>
            <a href="/dashboard/staff/manage-books" className="block hover:underline">Manage Books</a>
            <a href="/dashboard/staff/borrow-requests" className="block hover:underline">Borrow Requests</a>
            <a href="/dashboard/staff/returns" className="block hover:underline">Manage Returns</a>
            <a href="/dashboard/staff/students" className="block hover:underline">Manage Students</a>
            <a href="/dashboard/staff/notifications" className="block hover:underline">Notifications</a>
            <a href="/dashboard/staff/profile" className="block hover:underline">Profile</a>
          </nav>
        </div>

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
