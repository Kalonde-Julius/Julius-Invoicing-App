// Products/Show.jsx
import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Show({ product }) {
  const { delete: destroy, processing } = useForm();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      destroy(`/products/${product.id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No Image Available</span>
          )}
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold text-indigo-600">
            UGX {parseFloat(product.price).toFixed(0)}/=
          </p>

          {/* Actions */}
          <div className="flex space-x-4 mt-6">
            <Link
              href={`/products/${product.id}/edit`}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Edit
            </Link>
            <Link
              href="/products"
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
