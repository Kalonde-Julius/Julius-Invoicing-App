import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/clients');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Add Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="border rounded w-full p-2"
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>

        <div>
          <label className="block">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="border rounded w-full p-2"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>

        <div>
          <label className="block">Phone</label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => setData('phone', e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block">Address</label>
          <textarea
            value={data.address}
            onChange={(e) => setData('address', e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Client
        </button>
      </form>
    </div>
  );
}
