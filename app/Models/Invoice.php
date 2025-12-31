<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model {

  protected $fillable = [
        'invoice_number',
        'client_name', // ✅ now storing client_name directly
        'invoice_date',
        'grand_total',
    ];

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function items() {
        return $this->hasMany(InvoiceItem::class);
    }

}
