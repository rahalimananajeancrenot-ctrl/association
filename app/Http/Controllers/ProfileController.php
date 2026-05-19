<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use App\Models\Entite;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Dashboard général des membres SAVA-U.
     */
    public function memberDashboard(Request $request): Response
    {
        $search = $request->input('search');

        // Nombre de membres par entité
        $entitesStats = Entite::withCount('users')
            ->orderBy('entite')
            ->get()
            ->map(function ($entite) {
                return [
                    'id' => $entite->id,
                    // On renvoie "name" au frontend pour éviter de modifier React
                    'name' => $entite->entite,
                    'members_count' => $entite->users_count,
                ];
            });

        // Liste des membres avec recherche par nom
        $members = User::with([
                'entite',
                'etablissement',
                'classe',
                'niveau',
                'logement',
            ])
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'adresse' => $user->adresse,
                    'contact' => $user->contact,
                    'image' => $user->image
                        ? asset('storage/' . $user->image)
                        : null,

                    'entite' => $user->entite ? [
                        'id' => $user->entite->id,
                        'name' => $user->entite->entite,
                    ] : null,

                    'etablissement' => $user->etablissement ? [
                        'id' => $user->etablissement->id,
                        'name' => $user->etablissement->name
                            ?? $user->etablissement->nom
                            ?? $user->etablissement->etablissement
                            ?? null,
                    ] : null,

                    'classe' => $user->classe ? [
                        'id' => $user->classe->id,
                        'name' => $user->classe->name
                            ?? $user->classe->nom
                            ?? $user->classe->classe
                            ?? null,
                    ] : null,

                    'niveau' => $user->niveau ? [
                        'id' => $user->niveau->id,
                        'name' => $user->niveau->name
                            ?? $user->niveau->nom
                            ?? $user->niveau->niveau
                            ?? null,
                    ] : null,

                    'logement' => $user->logement ? [
                        'id' => $user->logement->id,
                        'name' => $user->logement->name
                            ?? $user->logement->nom
                            ?? $user->logement->logement
                            ?? null,
                    ] : null,
                ];
            });

        return Inertia::render('Dashboard', [
            'members' => $members,
            'entitesStats' => $entitesStats,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Affichage complet d'un membre.
     */
    public function showMember(User $user): Response
    {
        $user->load([
            'entite',
            'etablissement',
            'classe',
            'niveau',
            'logement',
        ]);

        return Inertia::render('Members/Show', [
            'member' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'adresse' => $user->adresse,
                'contact' => $user->contact,
                'image' => $user->image
                    ? asset('storage/' . $user->image)
                    : null,

                'entite' => $user->entite ? [
                    'id' => $user->entite->id,
                    'name' => $user->entite->entite,
                ] : null,

                'etablissement' => $user->etablissement ? [
                    'id' => $user->etablissement->id,
                    'name' => $user->etablissement->name
                        ?? $user->etablissement->nom
                        ?? $user->etablissement->etablissement
                        ?? null,
                ] : null,

                'classe' => $user->classe ? [
                    'id' => $user->classe->id,
                    'name' => $user->classe->name
                        ?? $user->classe->nom
                        ?? $user->classe->classe
                        ?? null,
                ] : null,

                'niveau' => $user->niveau ? [
                    'id' => $user->niveau->id,
                    'name' => $user->niveau->name
                        ?? $user->niveau->nom
                        ?? $user->niveau->niveau
                        ?? null,
                ] : null,

                'logement' => $user->logement ? [
                    'id' => $user->logement->id,
                    'name' => $user->logement->name
                        ?? $user->logement->nom
                        ?? $user->logement->logement
                        ?? null,
                ] : null,
            ],
        ]);
    }

    /**
     * Page modification profil.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user()->load('logement');

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),

            'auth' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Mise à jour profil.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')
            ->with('status', 'profile-updated');
    }

    /**
     * Suppression compte utilisateur.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Mise à jour photo de profil.
     */
    public function updatePhoto(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $folder = 'profiles/' . $user->id;

        if ($user->image && Storage::disk('public')->exists($user->image)) {
            Storage::disk('public')->delete($user->image);
        }

        $path = $request->file('image')->store($folder, 'public');

        $user->update([
            'image' => $path,
        ]);

        return back()->with('success', 'Photo mise à jour avec succès');
    }
}