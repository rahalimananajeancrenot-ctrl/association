<?php

namespace App\Http\Controllers\Tresorier;

use App\Http\Controllers\Controller;
use App\Models\Caisse;
use App\Models\Entre;
use App\Models\Sortie;
use App\Models\User;
use App\Models\Ressource_financiere;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class TresorierController extends Controller
{
    public function dashboard()
    {
        $totalEntrees = Caisse::where('type', 'entree')->sum('montant');
        $totalSorties = Caisse::where('type', 'sortie')->sum('montant');
        $solde = $totalEntrees - $totalSorties;

        $operations = Caisse::with('user')
            ->latest('date_operation')
            ->limit(10)
            ->get();

        return Inertia::render('Tresorier/Dashboard', [
            'stats' => [
                'totalEntrees' => $totalEntrees,
                'totalSorties' => $totalSorties,
                'solde' => $solde,
                'totalOperations' => Caisse::count(),
                'totalRessources' => Ressource_financiere::count(),
            ],
            'operations' => $operations,
        ]);
    }

    public function finances()
    {
        return Inertia::render('Tresorier/Finances', [
            'caisses' => Caisse::with(['user', 'entre.ressource_financiere', 'sortie'])
                ->latest('date_operation')
                ->get(),

            'entrees' => Entre::with(['ressource_financiere', 'caisse.user'])
                ->latest()
                ->get(),

            'sorties' => Sortie::with('caisse.user')
                ->latest()
                ->get(),

            'ressources' => Ressource_financiere::latest()->get(),

            'users' => User::orderBy('name')->get(),
        ]);
    }

    public function rapports(Request $request)
    {
        $filtre = $request->query('filtre', 'tous');

        $users = User::with('logement')
            ->orderBy('name')
            ->get();

        $membres = $users->map(function ($user) {
            $aPaye = Caisse::where('user_id', $user->id)
                ->where('type', 'entree')
                ->whereHas('entre.ressource_financiere', function ($query) {
                    $query->where(function ($q) {
                        $q->where('ressource', 'like', '%droit%')
                            ->orWhere('ressource', 'like', '%annuel%')
                            ->orWhere('ressource', 'like', '%cotisation%');
                    });
                })
                ->exists();

            $logement = $user->logement
                ? (
                    $user->logement->name
                    ?? $user->logement->nom
                    ?? $user->logement->logement
                    ?? 'Non attribué'
                )
                : 'Non attribué';

            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'adresse' => $logement,
                'logement' => $logement,
                'paye' => $aPaye,
            ];
        });

        $totalMembres = $membres->count();

        if ($filtre === 'actifs') {
            $membres = $membres->where('paye', true);
        }

        if ($filtre === 'non_actifs') {
            $membres = $membres->where('paye', false);
        }

        return Inertia::render('Tresorier/Rapports', [
            'membres' => $membres->values(),
            'totalMembres' => $totalMembres,
            'filtre' => $filtre,
        ]);
    }

    public function exportRapportPdf(Request $request)
    {
        $filtre = $request->query('filtre', 'tous');

        $users = User::with('logement')
            ->orderBy('name')
            ->get();

        $membres = $users->map(function ($user) {
            $aPaye = Caisse::where('user_id', $user->id)
                ->where('type', 'entree')
                ->whereHas('entre.ressource_financiere', function ($query) {
                    $query->where(function ($q) {
                        $q->where('ressource', 'like', '%droit%')
                            ->orWhere('ressource', 'like', '%annuel%')
                            ->orWhere('ressource', 'like', '%cotisation%');
                    });
                })
                ->exists();

            $logement = $user->logement
                ? (
                    $user->logement->name
                    ?? $user->logement->nom
                    ?? $user->logement->logement
                    ?? 'Non attribué'
                )
                : 'Non attribué';

            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'adresse' => $logement,
                'logement' => $logement,
                'paye' => $aPaye,
            ];
        });

        $totalMembres = $membres->count();

        if ($filtre === 'actifs') {
            $membres = $membres->where('paye', true);
        }

        if ($filtre === 'non_actifs') {
            $membres = $membres->where('paye', false);
        }

        $pdf = Pdf::loadView('rapports.pdf', [
            'membres' => $membres->values(),
            'totalMembres' => $totalMembres,
            'filtre' => $filtre,
        ])->setPaper('a4', 'portrait');

        return $pdf->download('rapport_membres_droit_annuel.pdf');
    }

    public function storeEntre(Request $request)
    {
        $validated = $request->validate([
            'description' => ['nullable', 'string', 'max:255'],
            'ressource_financiere_id' => ['required', 'exists:ressource_financieres,id'],
            'user_id' => ['required', 'exists:users,id'],
        ]);

        $ressource = Ressource_financiere::findOrFail($validated['ressource_financiere_id']);

        $caisse = Caisse::create([
            'type' => 'entree',
            'montant' => $ressource->montant,
            'description' => $validated['description'] ?? null,
            'date_operation' => now(),
            'user_id' => $validated['user_id'],
        ]);

        Entre::create([
            'montant' => $ressource->montant,
            'description' => $validated['description'] ?? null,
            'caisse_id' => $caisse->id,
            'ressource_financiere_id' => $ressource->id,
        ]);

        return back()->with('success', 'Entrée enregistrée avec succès.');
    }

    public function storeSortie(Request $request)
    {
        $validated = $request->validate([
            'montant' => ['required', 'numeric', 'min:1'],
            'description' => ['required', 'string', 'max:255'],
            'user_id' => ['nullable', 'exists:users,id'],
        ]);

        $totalEntrees = Caisse::where('type', 'entree')->sum('montant');
        $totalSorties = Caisse::where('type', 'sortie')->sum('montant');
        $solde = $totalEntrees - $totalSorties;

        if ($validated['montant'] > $solde) {
            return back()->withErrors([
                'montant' => 'Solde insuffisant pour effectuer cette sortie.',
            ]);
        }

        $caisse = Caisse::create([
            'type' => 'sortie',
            'montant' => $validated['montant'],
            'description' => $validated['description'],
            'date_operation' => now(),
            'user_id' => $validated['user_id'] ?? Auth::id(),
        ]);

        Sortie::create([
            'montant' => $validated['montant'],
            'description' => $validated['description'],
            'caisse_id' => $caisse->id,
        ]);

        return back()->with('success', 'Sortie enregistrée avec succès.');
    }

    public function storeRessource(Request $request)
    {
        $validated = $request->validate([
            'ressource' => ['required', 'string', 'max:255', 'unique:ressource_financieres,ressource'],
            'montant' => ['required', 'numeric', 'min:1'],
            'annee' => ['required', 'integer', 'digits:4'],
        ]);

        Ressource_financiere::create([
            'ressource' => $validated['ressource'],
            'montant' => $validated['montant'],
            'annee' => $validated['annee'],
        ]);

        return back()->with('success', 'Ressource financière ajoutée avec succès.');
    }
}