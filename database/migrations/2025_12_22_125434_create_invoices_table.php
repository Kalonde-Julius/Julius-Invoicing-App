<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    // Run the migrations.
    public function up(): void {

        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->string('client_name'); // ✅ store client name directly
            $table->date('invoice_date');
            $table->decimal('grand_total', 12, 0); // overall invoice total
            $table->timestamps();
        });

    }

    // Reverse the migrations.
    public function down(): void {
        Schema::dropIfExists('invoices');
    }
};
