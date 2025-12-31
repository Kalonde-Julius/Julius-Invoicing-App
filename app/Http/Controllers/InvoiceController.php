<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of invoices.
     */
    public function index()
    {
        $invoices = Invoice::with('items.product')->latest()->get();

        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices,
        ]);
    }

    /**
     * Show the form for creating a new invoice.
     */
    public function create() {
        return Inertia::render('Invoices/Create', [
            'clients' => Client::select('id', 'name')->get(),
            'products' => Product::select('id', 'name')->get(),
        ]);
    }

    // Store a newly created invoice.
    public function store(Request $request) {
        
        $validated = $request->validate([
            'invoice_number' => 'required|unique:invoices',
            'client_name'    => 'required|string|max:255',
            'invoice_date'   => 'required|date',
            'grand_total'    => 'required|numeric|min:0',
            'items'          => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.discount'   => 'nullable|numeric|min:0',
            'items.*.tax'        => 'nullable|numeric|min:0',
            'items.*.subtotal'   => 'required|numeric|min:0',
            'items.*.total'      => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated) {
            $invoice = Invoice::create([
                'invoice_number' => $validated['invoice_number'],
                'client_name'    => $validated['client_name'],
                'invoice_date'   => $validated['invoice_date'],
                'grand_total'    => $validated['grand_total'],
            ]);

            foreach ($validated['items'] as $item) {
                $invoice->items()->create($item);
            }
        });

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice created successfully!');
    }

    /**
     * Display a specific invoice.
     */
    public function show(Invoice $invoice) {

        $invoice->load('items.product');

        return Inertia::render('Invoices/Show', [
            'invoice' => $invoice,
        ]);
    }

    /**
     * Show the form for editing an invoice.
     */
    public function edit(Invoice $invoice) {

        $invoice->load('items.product');

        return Inertia::render('Invoices/Edit', [
            'invoice' => $invoice,
            'clients' => Client::select('id', 'name')->get(),
            'products' => Product::select('id', 'name')->get(),
        ]);

    }

    /**
     * Update an existing invoice.
     */
    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'invoice_number' => 'required|unique:invoices,invoice_number,' . $invoice->id,
            'client_name'    => 'required|string|max:255',
            'invoice_date'   => 'required|date',
            'grand_total'    => 'required|numeric|min:0',
            'items'          => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.discount'   => 'nullable|numeric|min:0',
            'items.*.tax'        => 'nullable|numeric|min:0',
            'items.*.subtotal'   => 'required|numeric|min:0',
            'items.*.total'      => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated, $invoice) {
            $invoice->update([
                'invoice_number' => $validated['invoice_number'],
                'client_name'    => $validated['client_name'],
                'invoice_date'   => $validated['invoice_date'],
                'grand_total'    => $validated['grand_total'],
            ]);

            // Replace items
            $invoice->items()->delete();
            foreach ($validated['items'] as $item) {
                $invoice->items()->create($item);
            }
        });

        return redirect()->route('invoices.show', $invoice->id)
            ->with('success', 'Invoice updated successfully!');
    }

    // Remove an invoice.
    public function destroy(Invoice $invoice) {

        $invoice->delete();

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice deleted successfully!');
    }

}
