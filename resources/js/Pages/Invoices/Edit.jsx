import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Edit({ invoice, clients = [], products = [] }) {

    const { data, setData, put, processing, errors } = useForm({
    invoice_number: invoice.invoice_number || '',
    client_name: invoice.client_name || '',
    invoice_date: invoice.invoice_date || '',
    grand_total: invoice.grand_total || '',
    items: invoice.items.map((item) => ({
      id: item.id,
      product_id: item.product_id,
      unit_price: item.unit_price,
      quantity: item.quantity,
      discount: item.discount,
      tax: item.tax,
      subtotal: item.subtotal,
      total: item.total,
    })),

  });

  const handleItemChange = (index, field, value) => {
    const updated = [...data.items];
    updated[index][field] = value;

    const price = parseFloat(updated[index].unit_price) || 0;
    const qty = parseFloat(updated[index].quantity) || 0;
    const discount = parseFloat(updated[index].discount) || 0;
    const tax = parseFloat(updated[index].tax) || 0;

    let subtotal = price * qty;
    let lineTotal = subtotal;
    lineTotal -= (lineTotal * discount) / 100;
    lineTotal += (lineTotal * tax) / 100;

    updated[index].subtotal = subtotal.toFixed(2);
    updated[index].total = lineTotal.toFixed(2);

    setData('items', updated);
    setData(
      'grand_total',
      updated.reduce((sum, item) => sum + parseFloat(item.total || 0), 0).toFixed(2)
    );
  };

  const addItem = () => {
    setData('items', [
      ...data.items,
      { product_id: '', unit_price: 0, quantity: 1, discount: 0, tax: 0, subtotal: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const updated = data.items.filter((_, i) => i !== index);
    setData('items', updated);
    setData(
      'grand_total',
      updated.reduce((sum, item) => sum + parseFloat(item.total || 0), 0).toFixed(2)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/invoices/${invoice.id}`); // ✅ update existing invoice
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">Edit Invoice</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Invoice Header */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Invoice No</label>
            <input
              type="text"
              value={data.invoice_number}
              onChange={(e) => setData('invoice_number', e.target.value)}
              className="border rounded w-full p-2"
            />
            {errors.invoice_number && <div className="text-red-500">{errors.invoice_number}</div>}
          </div>

          <div>
            <label className="block font-medium">Invoice Date</label>
            <input
              type="date"
              value={data.invoice_date}
              onChange={(e) => setData('invoice_date', e.target.value)}
              className="border rounded w-full p-2"
            />
            {errors.invoice_date && <div className="text-red-500">{errors.invoice_date}</div>}
          </div>
        </div>

        {/* Client Dropdown */}
        <div>
        <label className="block font-medium">Customer</label>
        <select
            value={data.client_name}
            onChange={(e) => setData('client_name', e.target.value)}
            required
            className="border rounded w-full p-2"
        >
            <option value="" disabled>-- Select Customer --</option>
            {clients.length > 0 ? (
            clients.map((c) => (
                <option key={c.id} value={c.name}>
                {c.name}
                </option>
            ))
            ) : (
            <option disabled>No clients available</option>
            )}
        </select>
        {errors.client_name && <div className="text-red-500">{errors.client_name}</div>}
        </div>


        {/* Invoice Details Table */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-indigo-600">Invoice Details</h2>
          <div className="grid grid-cols-7 gap-2 text-sm font-medium border-b pb-2">
            <span>Product</span>
            <span>Unit Price</span>
            <span>Qty</span>
            <span>Discount %</span>
            <span>Tax %</span>
            <span>Subtotal</span>
            <span>Total</span>
          </div>

          {data.items.map((item, index) => (
            <div key={index} className="grid grid-cols-7 gap-2 py-2 items-center">
              <select
                value={item.product_id}
                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                className="border rounded p-1"
              >
                <option value="">Select</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={item.unit_price}
                onChange={(e) => handleItemChange(index, 'unit_price', e.target.value)}
                className="border rounded p-1"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="border rounded p-1"
              />
              <input
                type="number"
                value={item.discount}
                onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
                className="border rounded p-1"
              />
              <input
                type="number"
                value={item.tax}
                onChange={(e) => handleItemChange(index, 'tax', e.target.value)}
                className="border rounded p-1"
              />
              <span>{item.subtotal}</span>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{item.total}</span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            + Add Item
          </button>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="font-bold text-indigo-700">Grand Total:</span>
          <span className="text-xl font-bold">{data.grand_total}</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={processing}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 w-full"
        >
          Update Invoice
        </button>
      </form>
    </div>
  );
}
