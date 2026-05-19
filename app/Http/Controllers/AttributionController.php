<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Attribution;
use App\Models\Logement;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PDF; // ← façade DomPDF
use App\Notifications\AttributionNotification;

class AttributionController extends Controller
{
    // 📄 Page
    public function index()
    {
        $attributions = Attribution::with('logement')->get();

        // Ajouter les étudiants pour chaque attribution
        $attributions->transform(function($attr) {
            $attr->etudiants = User::whereIn('id', $attr->user_ids)->get(['id', 'name']);
            return $attr;
        });

        return inertia('Attributions/Index', [
            'attributions' => $attributions
        ]);
    }

    public function store(Request $request)
    {
        $allAttributions = [];

        foreach ($request->input('attributions', []) as $attr) {
            $logement = Logement::find($attr['logement_id']);
            if (!$logement) continue;

            $users = [];

            foreach ($attr['user_ids'] as $user_id) {
                $user = User::find($user_id);
                if ($user) {
                    // Mettre à jour le logement de l'étudiant
                    $user->logement_id = $logement->id;
                    $user->save();

                    $users[] = ['name' => $user->name];
                }
            }

            // Ajouter le groupe pour le PDF
            $allAttributions[] = [
                'logement_name' => $logement->name,
                'users' => $users,
                'created_at' => now()
            ];
        }

        // Générer un seul PDF pour tous les groupes
        $pdf = PDF::loadView('pdf.attribution', [
            'attributions' => $allAttributions
        ]);

        $fileName = 'attributions/' . time() . '.pdf';
        Storage::disk('public')->put($fileName, $pdf->output());

        // Sauvegarder chaque attribution en base
        foreach ($request->input('attributions', []) as $attr) {
            Attribution::create([
                'logement_id' => $attr['logement_id'],
                'user_ids' => $attr['user_ids'],
                'pdf_path' => $fileName
            ]);
        }

        return redirect()->route('attributions.index')
            ->with('success', 'Attributions enregistrées et PDF généré avec succès !');
    }


    public function create()
    {
        // Étudiants actuellement dans les "salles d’étude"
        $etudiants = User::whereNotNull('logement_id')
            ->whereHas('logement', function ($query) {
                $query->where('nbrPlace', '>=', 10);
            })
            ->get();

        // Logements permanents (petite capacité)
        $logements = Logement::where('nbrPlace', '<', 20)->get();

        return Inertia::render('Attributions/Create', [
            'etudiants' => $etudiants,
            'logements' => $logements
        ]);
    }
}
