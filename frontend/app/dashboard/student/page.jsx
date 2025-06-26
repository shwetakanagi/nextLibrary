'use client';
import Link from "next/link";


export default function StudentDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Welcome, Student 👋</h1>
          <p className="text-gray-600 text-lg">Manage your books, track your history, and stay updated with notifications.</p>
        </div>

        {/* Quick Actions */}
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/dashboard/student/borrowed">
          <div className="bg-blue-100 hover:bg-blue-200 transition p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-blue-800">📚 My Books</h2>
            <p className="text-gray-700 mt-2">View and manage your borrowed books.</p>
          </div>
          </Link>

          <Link href="/dashboard/student/history">
          <div className="bg-green-100 hover:bg-green-200 transition p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-green-800">📖 History</h2>
            <p className="text-gray-700 mt-2">Check your borrowing and return history.</p>
          </div>
          </Link>
          
          <Link href="/dashboard/student/notifications">
          <div className="bg-yellow-100 hover:bg-yellow-200 transition p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-yellow-800">🔔 Notifications</h2>
            <p className="text-gray-700 mt-2">See updates and due date alerts.</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

