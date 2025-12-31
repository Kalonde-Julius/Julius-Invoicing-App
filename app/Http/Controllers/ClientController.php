<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        return Inertia::render('Clients/Index', [
            'clients' => Client::latest()->get(),
        ]);
    }

    // Show the form for creating a new resource.
    public function create()
    {
        return Inertia::render('Clients/Create');
    }

    // Store a newly created resource in storage.
    public function store(Request $request) {

        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:clients,email',
            'phone'   => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        Client::create($request->only('name', 'email', 'phone', 'address'));

        return redirect()->route('clients.index')
                         ->with('success', 'Client created successfully.');
    }

    // Display the specified resource.
    public function show(Client $client) {

        return Inertia::render('Clients/Show', [
            'client' => $client,
        ]);
    }

    // Show the form for editing the specified resource.
    public function edit(Client $client) {

        return Inertia::render('Clients/Edit', [
            'client' => $client,
        ]);
    }

    // Update the specified resource in storage.
    public function update(Request $request, Client $client) {

        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:clients,email,' . $client->id,
            'phone'   => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        $client->update($request->only('name', 'email', 'phone', 'address'));

        return redirect()->route('clients.index')
                         ->with('success', 'Client updated successfully.');
    }

    // Remove the specified resource from storage.
    public function destroy(Client $client) {
        
        $client->delete();

        return redirect()->route('clients.index')
                         ->with('success', 'Client deleted successfully.');
    }
}
