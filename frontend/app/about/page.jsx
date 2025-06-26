export default function About() {
  return (
    <main className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to Our Library System
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          A simple, student-focused digital library system built for easy access, efficient tracking, and smooth library management.
        </p>
      </section>

      <div className="my-12 border-t border-gray-200" />

      {/* Student Features */}
      <section className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">👩‍🎓 For Students</h2>
          <ul className="space-y-3 text-gray-700 list-disc list-inside">
            <li>Browse available books by category or title</li>
            <li>Borrow and return books easily online</li>
            <li>View your borrow/return history anytime</li>
            <li>Receive notifications and due date reminders</li>
          </ul>
        </div>

        {/* Admin Features */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛠️ For Admins</h2>
          <ul className="space-y-3 text-gray-700 list-disc list-inside">
            <li>Manage and update book inventory</li>
            <li>Track student borrow/return activity</li>
            <li>Monitor overdue books and send alerts</li>
            <li>View usage reports and borrowing trends</li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <p className="text-xl text-gray-800 font-medium">
          Designed for simplicity, built for education. 📚
        </p>
      </section>
    </main>
  );
}
