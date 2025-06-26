import Head from 'next/head';

export default function Support() {
  return (
    <>
      <Head>
        <title>Library Support | MyLibrary</title>
        <meta name="description" content="Get help with your library account, borrowing, and technical support." />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">📚 Library Support</h1>

        <p className="mb-8 text-lg text-gray-700">
          Need help? We’re here to assist you. Find support options and FAQs below.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">📞 Contact Us</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:demo@gmail.com" className="text-blue-600 underline">
                demo@gmail.com
              </a>
            </li>
            <li><strong>Phone:</strong> +1 (123) 456-7890</li>
            <li><strong>Address:</strong> 123 Library Lane, Booktown, BK 45678</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">💡 Frequently Asked Questions</h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>How do I reset my password?</strong><br />
              Go to the login page and click “Forgot Password”.
            </li>
            <li>
              <strong>How do I borrow a book?</strong><br />
              Search the catalog, click on a book, and choose “Borrow”.
            </li>
            <li>
              <strong>How do I return a book?</strong><br />
              Visit your account and select “Return” under borrowed items.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🛠️ Technical Support</h2>
          <p className="text-gray-700">
            If you’re experiencing issues with the website, please contact our IT team at{' '}
            <a href="mailto:demo@gmail.com" className="text-blue-600 underline">
              demo@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">⏰ Support Hours</h2>
          <p className="text-gray-700">
            Monday to Friday: 9:00 AM – 6:00 PM<br />
            Saturday: 10:00 AM – 4:00 PM<br />
            Sunday: Closed
          </p>
        </section>
      </main>
    </>
  );
}
