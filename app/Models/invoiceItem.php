<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model {

    protected $fillable = [
        'invoice_id',
        'product_id',
        'unit_price',
        'quantity',
        'discount',
        'tax',
        'subtotal',
        'total',
    ];

    // Each invoice item belongs to an invoice.
    public function invoice() {
        return $this->belongsTo(Invoice::class);
    }

    // Each invoice item references a product.
    public function product() {
        return $this->belongsTo(Product::class);
    }
    
}
