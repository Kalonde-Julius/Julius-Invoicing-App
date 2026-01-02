// Dashboard.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { CubeIcon, UserGroupIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Dashboard({ stats = {} }) {
  // Provide defaults to avoid crashes
  const {
    products = 0,
    clients = 0,
    invoices = 0,
  } = stats;

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-3xl font-bold text-center leading-tight text-cyan-500">
          Julius Invoicing App
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <CubeIcon className="h-10 w-10 text-indigo-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-800"> Products </h3>
              <p className="text-3xl font-bold text-indigo-500">{products}</p>
              <p className="text-gray-500 text-sm">Total Products</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6 text-center">
              <UserGroupIcon className="h-10 w-10 text-indigo-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-800">Clients</h3>
              <p className="text-3xl font-bold text-indigo-500">{clients}</p>
              <p className="text-gray-500 text-sm">Registered Clients</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6 text-center">
              <DocumentTextIcon className="h-10 w-10 text-indigo-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-800">Invoices</h3>
              <p className="text-3xl font-bold text-indigo-500">{invoices}</p>
              <p className="text-gray-500 text-sm">Issued Invoices</p>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/products"
              className="bg-white shadow hover:shadow-lg transition rounded-lg p-6 flex flex-col items-center text-center"
            >
                <CubeIcon className="h-12 w-12 text-indigo-500 mb-4" />

              <h3 className="text-lg font-semibold text-gray-800">Products</h3>

              <p className="text-gray-500 text-sm mt-2">
                Manage your product catalog & pricing.
              </p>
            </Link>

            <Link href="/clients"
              className="bg-white shadow hover:shadow-lg transition rounded-lg p-6 flex flex-col items-center text-center"
            >
              <UserGroupIcon className="h-12 w-12 text-indigo-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Clients</h3>
              <p className="text-gray-500 text-sm mt-2">
                View & manage your client information.
              </p>
            </Link>

            <Link href="/invoices"
                className="bg-white shadow hover:shadow-lg transition rounded-lg p-6 flex flex-col items-center text-center">
                <DocumentTextIcon className="h-12 w-12 text-indigo-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800">Invoices</h3>
                <p className="text-gray-500 text-sm mt-2">
                    Track & manage invoices efficiently.
                </p>
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
