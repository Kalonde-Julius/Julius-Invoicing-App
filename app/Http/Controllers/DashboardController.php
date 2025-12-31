<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller {

    public function index() {
        
        return Inertia::render('Dashboard', [
            'stats' => [
                'products' => Product::count(),
                'clients' => Client::count(),
                'invoices' => Invoice::count(),
            ],
        ]);
    }

}
