import React from 'react';
import { Link } from '@inertiajs/react';
import { FaTrash, FaEye, FaPen, FaTachometerAlt } from "react-icons/fa";

export default function Index({ clients }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Clients</h1>

      <div className="flex justify-end mb-4 gap-2">
        <Link href="/clients/create"
           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 inline-block" >
               + Add Client
        </Link>

        {/* Dashboard Link */}
        <Link href="/dashboard" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-1" >
            <FaTachometerAlt /> Dashboard
        </Link>

      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="p-2 border">{client.id}</td>
                <td className="p-2 border">{client.name}</td>
                <td className="p-2 border">{client.email}</td>
                <td className="p-2 border">{client.phone}</td>
                <td className="p-2 border">{client.address}</td>

                <td className="p-2 border flex flex-wrap space-x-2 space-y-2 justify-between">
                  <Link href={`/clients/${client.id}`} className="text-indigo-600 hover:underline mr-2">
                    <FaEye className="text-indigo-600 cursor-pointer" />
                  </Link>

                  <Link href={`/clients/${client.id}/edit`} className="text-green-600 hover:underline mr-2 ">
                    <FaPen className="text-green-600 cursor-pointer" />
                  </Link>

                  <Link href={`/clients/${client.id}/delete`} className="text-red-600 hover:underline mr-2">
                     <FaTrash className="text-red-600 cursor-pointer" />
                  </Link>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
