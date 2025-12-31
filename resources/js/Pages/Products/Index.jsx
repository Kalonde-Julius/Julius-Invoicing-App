import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaTachometerAlt } from 'react-icons/fa';

export default function Index() {
  const { products } = usePage().props;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        Products
      </h1>

      <div className="flex justify-end mb-4 gap-2">
        <Link href="/products/create" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"        >
            + Add Product
        </Link>

        {/* Dashboard Link */}
        <Link href="/dashboard" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-1" >
            <FaTachometerAlt /> Dashboard
        </Link>

      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-right">Price</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2 text-right">{product.price}</td>
              <td className="border p-2 text-center space-x-2">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  href={`/products/${product.id}`}
                  className="text-green-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
