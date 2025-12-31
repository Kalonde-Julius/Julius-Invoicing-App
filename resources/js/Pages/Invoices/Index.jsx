// resources/js/Pages/Invoices/Index.jsx
import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { FaEye, FaPen, FaTachometerAlt, FaTrash } from 'react-icons/fa';

export default function Index() {
  const { invoices } = usePage().props;

  const formatNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? value : num.toLocaleString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
            All Invoices
      </h1>

      {/* Top Actions */}
      <div className="flex justify-end mb-6 gap-3">
        <Link
          href="/invoices/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + New Invoice
        </Link>
        <Link
          href="/dashboard"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
        >
          <FaTachometerAlt /> Dashboard
        </Link>
      </div>

      {/* Invoice Cards */}
      <div className="space-y-6">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white shadow rounded-lg overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-gray-50 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Invoice #{invoice.invoice_number}
                </h2>
                <p className="text-md font-semibold text-gray-500">
                  {invoice.client_name} <br/>
                   {formatDate(invoice.invoice_date)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-md font-semibold text-left text-gray-500">Grand Total:</p>
                <p className="text-xl font-bold text-indigo-600">
                 UGX {formatNumber(invoice.grand_total)}/=
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="px-6 py-4">
              <h3 className="font-semibold text-indigo-600 mb-2">Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2 text-right">Unit Price</th>
                      <th className="p-2 text-center">Qty</th>
                      <th className="p-2 text-center">Discount %</th>
                      <th className="p-2 text-center">Tax %</th>
                      <th className="p-2 text-right">Subtotal</th>
                      <th className="p-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-2">{item.product?.name}</td>
                        <td className="p-2 text-right">
                          {formatNumber(item.unit_price)}/=
                        </td>
                        <td className="p-2 text-center">{item.quantity}</td>
                        <td className="p-2 text-center">{item.discount}</td>
                        <td className="p-2 text-center">{item.tax}</td>
                        <td className="p-2 text-right">
                          {formatNumber(item.subtotal)}/=
                        </td>
                        <td className="p-2 text-right">
                          {formatNumber(item.total)}/=
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 bg-gray-50 px-6 py-3">
              <Link
                href={`/invoices/${invoice.id}`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
                title="View Invoice"
              >
                <FaEye />
              </Link>
              <Link
                href={`/invoices/${invoice.id}/edit`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                title="Edit Invoice"
              >
                <FaPen />
              </Link>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this invoice?')) {
                    router.delete(`/invoices/${invoice.id}`);
                  }
                }}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                title="Delete Invoice"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
