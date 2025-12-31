<?php

namespace App\Http\Controllers;

use App\Models\InvoiceItem;
use App\Models\Product;
use Illuminate\Http\Request;

class InvoiceItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = InvoiceItem::with('product')->latest()->get();

        return response()->json($items);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::select('id', 'name')->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'product_id' => 'required|exists:products,id', // ✅ fixed
            'unit_price' => 'required|numeric|min:0',
            'quantity'   => 'required|integer|min:1',
            'discount'   => 'nullable|numeric|min:0',
            'tax'        => 'nullable|numeric|min:0',
            'subtotal'   => 'required|numeric|min:0',
            'total'      => 'required|numeric|min:0',
        ]);

        $item = InvoiceItem::create($validated);

        return response()->json([
            'message' => 'Invoice item created successfully!',
            'item'    => $item->load('product'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(InvoiceItem $invoiceItem)
    {
        return response()->json($invoiceItem->load('product'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InvoiceItem $invoiceItem)
    {
        $products = Product::select('id', 'name')->get();

        return response()->json([
            'invoiceItem' => $invoiceItem->load('product'),
            'products'    => $products,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InvoiceItem $invoiceItem)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id', // ✅ fixed
            'unit_price' => 'required|numeric|min:0',
            'quantity'   => 'required|integer|min:1',
            'discount'   => 'nullable|numeric|min:0',
            'tax'        => 'nullable|numeric|min:0',
            'subtotal'   => 'required|numeric|min:0',
            'total'      => 'required|numeric|min:0',
        ]);

        $invoiceItem->update($validated);

        return response()->json([
            'message' => 'Invoice item updated successfully!',
            'item'    => $invoiceItem->load('product'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InvoiceItem $invoiceItem)
    {
        $invoiceItem->delete();

        return response()->json([
            'message' => 'Invoice item deleted successfully!',
        ]);
    }
}
