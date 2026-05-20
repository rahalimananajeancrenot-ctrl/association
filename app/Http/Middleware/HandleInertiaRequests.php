<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),

            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'contact' => $user->contact,
                    'adresse' => $user->adresse,
                    'image' => $user->image,

                    // ✅ Spatie roles
                    'role' => $user->getRoleNames()->first(),
                    'roles' => $user->getRoleNames()->values(),
                ] : null,
            ],

            'notifications' => $user ? [
                // ✅ Nombre des notifications non lues pour le badge
                'unread_count' => $user->unreadNotifications()->count(),

                // ✅ Les 10 dernières notifications
                'items' => $user->notifications()
                    ->latest()
                    ->limit(10)
                    ->get()
                    ->map(function ($notification) {
                        return [
                            'id' => $notification->id,
                            'type' => $notification->type,

                            // ✅ Lu / non lu
                            'read_at' => $notification->read_at,
                            'is_read' => $notification->read_at !== null,

                            // ✅ Date lisible
                            'created_at' => $notification->created_at
                                ? $notification->created_at->diffForHumans()
                                : null,

                            // ✅ Données envoyées par NewEvenementNotification
                            'data' => $notification->data,

                            // ✅ Lien direct vers la page single notification
                            // En cliquant dessus, le contrôleur va marquer la notification comme lue
                            'show_url' => route('membre.notifications.show', $notification->id),
                        ];
                    }),
            ] : [
                'unread_count' => 0,
                'items' => [],
            ],
        ];
    }
}