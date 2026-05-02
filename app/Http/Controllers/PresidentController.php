<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Logement;
use App\Models\Type_logement;
use App\Models\User;
use App\Models\Niveau;
use App\Models\Etablissement;
use App\Models\Classe;
use App\Models\Entite;
use Inertia\Inertia;

class PresidentController extends Controller
{
    public function dashboard()
    {
        $logements = Logement::with(['type_logement', 'users'])->latest()->get();
        $types = Type_logement::all();

        return Inertia::render('President/Dashboard', [
            'logements' => $logements,
            'types'     => $types,
        ]);
    }

    public function membres(Request $request)
    {
        // ✅ FIX : clés cohérentes avec ce qu'affiche le frontend
        $niveaux = Niveau::all()->map(fn($n) => [
            'id'     => $n->id,
            'niveau' => $n->niveau,
        ]);

        $logements = Logement::all()->map(fn($l) => [
            'id'   => $l->id,
            'name' => $l->name,
        ]);

        $typesLogements = Type_logement::all()->map(fn($t) => [
            'id'   => $t->id,
            'type' => $t->type,
        ]);

        // ✅ FIX : clé 'etablissement' au lieu de 'name'
        $etablissements = Etablissement::all()->map(fn($e) => [
            'id'            => $e->id,
            'etablissement' => $e->etablissement,
        ]);

        $classes = Classe::all()->map(fn($c) => [
            'id'   => $c->id,
            'name' => $c->name,
        ]);

        // ✅ FIX : clé 'entite' au lieu de 'name'
        $entites = Entite::all()->map(fn($e) => [
            'id'     => $e->id,
            'entite' => $e->entite,
        ]);

        $query = User::query()->with([
            'niveau',
            'logement.type_logement',
            'classe',
            'etablissement',
            'entite'
        ]);

        // 🔍 SEARCH (name + email)
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        // 🎯 FILTERS
        if ($request->filled('entite')) {
            $query->where('entite_id', $request->entite);
        }

        if ($request->filled('niveau')) {
            $query->where('niveau_id', $request->niveau);
        }

        if ($request->filled('logement')) {
            $query->where('logement_id', $request->logement);
        }

        if ($request->filled('type_logement')) {
            $query->whereHas('logement.type_logement', function ($q) use ($request) {
                $q->where('id', $request->type_logement);
            });
        }

        if ($request->filled('classe')) {
            $query->where('classe_id', $request->classe);
        }

        if ($request->filled('etablissement')) {
            $query->where('etablissement_id', $request->etablissement);
        }

        $membres = $query->paginate(10)->withQueryString();

        return Inertia::render('President/Membres/Index', [
            'membres' => $membres,

            'filters' => $request->only([
                'search',
                'entite',
                'niveau',
                'logement',
                'type_logement',
                'classe',
                'etablissement'
            ]),

            'niveaux'        => $niveaux,
            'logements'      => $logements,
            'typeLogements'  => $typesLogements,
            'etablissements' => $etablissements,
            'classes'        => $classes,
            'entites'        => $entites,
        ]);
    }

    // ✅ Méthode destroy pour la suppression d'un membre
    public function destroy(User $membre)
    {
        $membre->delete();

        return redirect()->route('president.membres.index');
    }
}