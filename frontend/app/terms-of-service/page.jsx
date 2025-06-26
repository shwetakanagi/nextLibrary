import Head from 'next/head';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service | MyLibrary</title>
        <meta name="description" content="Terms and conditions for using the MyLibrary system." />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">📄 Terms of Service</h1>

        <p className="mb-4 text-gray-700">
          By accessing or using the MyLibrary system, you agree to be bound by these terms. Please read them carefully.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">1. Library Membership</h2>
          <p className="text-gray-700">
            You must register for a library account to borrow materials. Each user is responsible for their own account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">2. Borrowing & Returning</h2>
          <p className="text-gray-700">
            Books must be returned on or before the due date. Late returns may incur fines or suspension of borrowing privileges.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">3. Acceptable Use</h2>
          <p className="text-gray-700">
            You agree not to misuse the system or attempt to disrupt its operation. Violations may result in account termination.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">4. Privacy</h2>
          <p className="text-gray-700">
            We value your privacy. Personal data will only be used to support your use of the library and will not be shared without your consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">5. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these terms from time to time. Continued use of the system means you accept the updated terms.
          </p>
        </section>

        <section>
          <p className="text-gray-700">
            If you have any questions about these terms, please contact us at{' '}
            <a href="mailto:demo@gmail.com" className="text-blue-600 underline">demo@gmail.com</a>.
          </p>
        </section>
      </main>
    </>
  );
}
