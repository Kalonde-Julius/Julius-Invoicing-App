// Clients/Show.jsx
import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Show({ client }) {
  const { delete: destroy, processing } = useForm();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this client?')) {
      destroy(`/clients/${client.id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-6">
          <h1 className="text-2xl font-bold">{client.name}</h1>
          <p className="text-sm opacity-80">Client Profile</p>
        </div>

        {/* Client Details */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-gray-700 font-semibold">Email</h2>
            <p className="text-gray-600">{client.email}</p>
          </div>

          <div>
            <h2 className="text-gray-700 font-semibold">Phone</h2>
            <p className="text-gray-600">{client.phone}</p>
          </div>

          <div>
            <h2 className="text-gray-700 font-semibold">Address</h2>
            <p className="text-gray-600">{client.address}</p>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mt-6">
            <Link
              href={`/clients/${client.id}/edit`}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Edit
            </Link>
            <Link
              href="/clients"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Back to List
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              disabled={processing}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
