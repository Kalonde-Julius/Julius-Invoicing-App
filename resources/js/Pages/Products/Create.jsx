import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    price: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/products'); // ✅ Correct endpoint
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
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
          <input
            type="number"
            step="0.01"
            value={data.price}
            onChange={(e) => setData('price', e.target.value)}
            className="border rounded w-full p-2"
          />
          {errors.price && <div className="text-red-500">{errors.price}</div>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={processing}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
