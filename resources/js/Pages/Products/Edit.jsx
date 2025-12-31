// Products/Edit.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Edit({ product }) {
  const { data, setData, put, delete: destroy, processing, errors } = useForm({
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/products/${product.id}`); // ✅ Update endpoint
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      destroy(`/products/${product.id}`); // ✅ Delete endpoint
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block">Product Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="border rounded w-full p-2"
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>

        {/* Description */}
        <div>
          <label className="block">Description</label>
          <input
            type="text"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="border rounded w-full p-2"
          />
          {errors.description && (
            <div className="text-red-500">{errors.description}</div>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block">Price</label>
          <input type="number"
            step="0.01"
            value={data.price}
            onChange={(e) => setData('price', e.target.value)}
            className="border rounded w-full p-2"
          />
          {errors.price && <div className="text-red-500">{errors.price}</div>}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button type="submit"
            disabled={processing}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Update Product
          </button>

          <button type="button"
            onClick={handleDelete}
            disabled={processing}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Delete Product
          </button>
        </div>
      </form>
    </div>
  );
}
