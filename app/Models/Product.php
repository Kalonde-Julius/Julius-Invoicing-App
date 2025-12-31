<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model {

    protected $fillable = [
        'name',
        'description',
        'price',
    ];

    // Relationships
    public function items() {
        return $this->hasMany(InvoiceItem::class);
    }

}
