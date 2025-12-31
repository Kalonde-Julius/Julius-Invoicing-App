<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    // Run the migrations.
    public function up(): void {

        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained('invoices')->onDelete('cascade'); // ✅ links to invoices
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // ✅ links to products
            $table->decimal('unit_price', 12, 2);
            $table->integer('quantity');
            $table->decimal('discount', 5, 2)->default(0); // percentage
            $table->decimal('tax', 5, 2)->default(0);      // percentage
            $table->decimal('subtotal', 12, 1);            // before discount/tax
            $table->decimal('total', 12, 2);               // after discount/tax
            $table->timestamps();
        });

    }

    // Reverse the migrations.
    public function down(): void {
        Schema::dropIfExists('invoice_items');
    }

};
