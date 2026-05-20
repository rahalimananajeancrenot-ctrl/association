<?php

namespace App\Http\Controllers;

use App\Models\Caisse;
use App\Models\Evenements;
use App\Models\Ressource_financiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MembreController extends Controller
{
    public function infos()
    {
        $user = Auth::user();

        $ressourceDroitAnnuel = Ressource_financiere::where(function ($query) {
                $query->where('ressource', 'like', '%droit%')
                    ->orWhere('ressource', 'like', '%annuel%')
                    ->orWhere('ressource', 'like', '%cotisation%');
            })
            ->latest()
            ->first();

        $paiement = Caisse::with('entre.ressource_financiere')
            ->where('user_id', $user->id)
            ->where('type', 'entree')
            ->whereHas('entre.ressource_financiere', function ($query) {
                $query->where(function ($q) {
                    $q->where('ressource', 'like', '%droit%')
                        ->orWhere('ressource', 'like', '%annuel%')
                        ->orWhere('ressource', 'like', '%cotisation%');
                });
            })
            ->latest('date_operation')
            ->first();

        return Inertia::render('Members/Infos', [
            'membre' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'contact' => $user->contact,
                'image' => $user->image ? asset('storage/' . $user->image) : null,
            ],

            'droitAnnuel' => [
                'existe' => $ressourceDroitAnnuel ? true : false,
                'ressource' => $ressourceDroitAnnuel?->ressource,
                'montant' => $ressourceDroitAnnuel?->montant,
                'annee' => $ressourceDroitAnnuel?->annee,
            ],

            'paiement' => [
                'a_paye' => $paiement ? true : false,
                'montant' => $paiement?->montant,
                'description' => $paiement?->description,
                'date_operation' => $paiement?->date_operation,
                'ressource' => $paiement?->entre?->ressource_financiere?->ressource,
            ],
        ]);
    }

    public function evenements()
    {
        $evenements = Evenements::with('user')
            ->latest()
            ->get()
            ->map(function ($evenement) {
                return [
                    'id' => $evenement->id,
                    'title' => $evenement->title,
                    'description' => $evenement->description,
                    'image' => $evenement->image ? asset('storage/' . $evenement->image) : null,
                    'created_at' => $evenement->created_at?->format('d/m/Y H:i'),
                    'shared_by' => $evenement->user?->name,
                ];
            });

        return Inertia::render('Members/Evenement', [
            'evenements' => $evenements,
        ]);
    }

    /**
     * ✅ Page single notification.
     * Quand l'utilisateur clique sur une notification,
     * elle est automatiquement marquée comme lue.
     */
    public function showNotification(Request $request, string $notification)
    {
        $notif = $request->user()
            ->notifications()
            ->where('id', $notification)
            ->firstOrFail();

        // ✅ Marquer comme lue automatiquement
        if (is_null($notif->read_at)) {
            $notif->markAsRead();
        }

        $evenementId = $notif->data['evenement_id'] ?? null;

        $evenement = $evenementId
            ? Evenements::with('user')->find($evenementId)
            : null;

        return Inertia::render('Members/SingleNotif', [
            'notification' => [
                'id' => $notif->id,
                'type' => $notif->type,
                'read_at' => $notif->read_at,
                'is_read' => $notif->read_at !== null,
                'created_at' => $notif->created_at?->format('d/m/Y H:i'),
                'data' => $notif->data,
            ],

            'evenement' => $evenement ? [
                'id' => $evenement->id,
                'title' => $evenement->title,
                'description' => $evenement->description,
                'image' => $evenement->image ? asset('storage/' . $evenement->image) : null,
                'created_at' => $evenement->created_at?->format('d/m/Y H:i'),
                'shared_by' => $evenement->user?->name,
            ] : null,
        ]);
    }

    /**
     * ✅ Marquer une notification comme lue manuellement.
     * Tu peux garder cette méthode si tu veux encore l'utiliser ailleurs.
     */
    public function markNotificationAsRead(Request $request, string $notification)
    {
        $notif = $request->user()
            ->notifications()
            ->where('id', $notification)
            ->firstOrFail();

        $notif->markAsRead();

        return back();
    }

    /**
     * ✅ Marquer toutes les notifications comme lues.
     */
    public function markAllNotificationsAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return back();
    }
}