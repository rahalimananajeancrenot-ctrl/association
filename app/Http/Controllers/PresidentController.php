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
use Spatie\Permission\Models\Role;

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
            'entite',
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
                'etablissement',
            ]),

            'niveaux'        => $niveaux,
            'logements'      => $logements,
            'typeLogements'  => $typesLogements,
            'etablissements' => $etablissements,
            'classes'        => $classes,
            'entites'        => $entites,
        ]);
    }

    /**
     * ✅ Page gestion des rôles utilisateurs.
     */
    public function roles(Request $request)
    {
        $search = $request->input('search');

        $users = User::with('roles')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'contact' => $user->contact,
                    'image' => $user->image ? asset('storage/' . $user->image) : null,

                    // Tous les rôles de l'utilisateur
                    'roles' => $user->roles->pluck('name')->values(),

                    // Rôle principal affiché dans le select
                    'current_role' => $user->roles->first()?->name,
                ];
            });

        $roles = Role::orderBy('name')
            ->get()
            ->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                ];
            });

        return Inertia::render('President/Roles/Index', [
            'users' => $users,
            'roles' => $roles,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * ✅ Modifier le rôle d'un utilisateur.
     */
    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => ['required', 'string', 'exists:roles,name'],
        ]);

        // Remplace tous les anciens rôles par le nouveau rôle choisi
        $user->syncRoles([$validated['role']]);

        return back()->with('success', 'Rôle utilisateur mis à jour avec succès.');
    }

    /**
     * ✅ Suppression d'un membre.
     */
    public function destroy(User $membre)
    {
        $membre->delete();

        return redirect()->route('president.membres.index');
    }
}