import React from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import { FaPrint, FaTachometerAlt } from 'react-icons/fa';

export default function Show() {
  const { invoice } = usePage().props;

  const formatNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? value : num.toLocaleString();
  };

  const formatDateWithOrdinal = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = (d) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    const dayWithSuffix = `${day}${suffix(day)}`;
    const weekday = date.toLocaleDateString('en-GB', { weekday: 'short' });
    const month = date.toLocaleDateString('en-GB', { month: 'long' });
    const year = date.getFullYear();
    return `${weekday} ${dayWithSuffix} ${month}, ${year}`;
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      router.delete(`/invoices/${invoice.id}`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-lg">

        <Head title={`Invoice #${invoice.invoice_number}`} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-3xl font-bold text-indigo-700">
          Invoice #{invoice.invoice_number}
        </h1>

        <div className="flex gap-2">
          <Link href="/invoices"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
            ← Back
          </Link>

        {/* Dashboard Link */}
          <Link href="/dashboard" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-1" >
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link
            href={`/invoices/${invoice.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-1"
          >
            <FaPrint /> Print
          </button>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <p className="text-lg font-semibold text-gray-800">
            Invoice No: #{invoice.invoice_number}-
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-gray-50">
          <p className="text-lg font-semibold text-gray-800">
            Date: {formatDateWithOrdinal(invoice.invoice_date)}
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-gray-50">
          <p className="text-lg font-semibold text-gray-800">
            Client: {invoice.client_name}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">Invoice Items</h2>
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Product</th>
              <th className="border p-2 text-right">Unit Price (UGX)</th>
              <th className="border p-2 text-center">Qty (KG)</th>
              <th className="border p-2 text-center">Discount %</th>
              <th className="border p-2 text-center">Tax %</th>
              <th className="border p-2 text-right">Subtotal (UGX)</th>
              <th className="border p-2 text-right">Total (UGX)</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border p-2">{item.product?.name}</td>
                <td className="border p-2 text-right">{formatNumber(item.unit_price)}/=</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-center">{item.discount}</td>
                <td className="border p-2 text-center">{item.tax}</td>
                <td className="border p-2 text-right">{formatNumber(item.subtotal)}/=</td>
                <td className="border p-2 text-right font-semibold text-indigo-700">
                  {formatNumber(item.total)}/=
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grand Total */}
      <div className="flex justify-end items-center border-t pt-4">
        <span className="text-xl font-bold text-indigo-700 mr-4">Grand Total:</span>
        <span className="text-2xl font-bold text-gray-900">
          UGX{formatNumber(invoice.grand_total)}/=
        </span>
      </div>

      <section className="mt-5 mb-2">

        <h2 className="text-lg font-semibold mb-2 text-indigo-600"> Additional Info: </h2>

        <article className='grid grid-cols-4 gap-4'>
        <div>
            <p className="mt-1 text-gray-600 whitespace-pre-wrap">
                Driver:  {invoice.driver || 'N/A'}
            </p>
        </div>

        <div>
            <p className="mt-1 text-gray-600 whitespace-pre-wrap">
                Vehicle:  {invoice.vehicle || 'N/A'}
            </p>
        </div>

        <div>
            <p className="mt-1 text-gray-600 whitespace-pre-wrap">
                Notes:  {invoice.notes || 'N/A'}
            </p>
        </div>

        </article>
    </section>

      {/* Footer */}
      <p className="text-center text-gray-500 mt-6">
        Thank you for choosing Kalonde Julius
      </p>

      {/* Print CSS */}
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}
