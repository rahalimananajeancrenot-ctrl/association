<?php

namespace App\Http\Controllers;

use App\Models\Logement;
use App\Models\Type_logement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogementController extends Controller
{
    public function index()
    {
        $logements = Logement::with('type_logement')->latest()->get();
        $types = Type_logement::all(); // 🔹 Récupère tous les types

        return Inertia::render('Logements/Index', [
            'logements' => $logements,
            'types' => $types, // 🔹 On envoie les types au frontend
        ]);
    }

    public function create()
    {
        return Inertia::render('Logements/Create', [
            'types' => Type_logement::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'nbrPlace' => 'required|integer',
            'type_logement_id' => 'required'
        ]);

        Logement::create($request->all());

        return redirect()->route('logements.index')->with('success', 'Logement créé');
    }

    public function edit(Logement $logement)
    {
        return Inertia::render('Logements/Edit', [
            'logement' => $logement,
            'types' => Type_logement::all()
        ]);
    }

    public function update(Request $request, Logement $logement)
    {
        $request->validate([
            'name' => 'required',
            'nbrPlace' => 'required|integer',
            'type_logement_id' => 'required'
        ]);

        $logement->update($request->all());

        return redirect()->route('logements.index')->with('success', 'Modifié');
    }

    public function destroy(Logement $logement)
    {
        $logement->delete();

        return redirect()->route('logements.index')->with('success', 'Supprimé');
    }
}