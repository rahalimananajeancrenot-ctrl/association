<?php

namespace App\Http\Controllers;

use App\Models\Evenements;
use App\Models\User;
use App\Notifications\NewEvenementNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SecretaireController extends Controller
{
    public function index()
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
                    'created_at' => $evenement->created_at->format('d/m/Y H:i'),
                    'shared_by' => $evenement->user?->name,
                ];
            });

        return Inertia::render('Secretaire/Evenements/Index', [
            'evenements' => $evenements,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('evenements', 'public');
        }

        $evenement = Evenements::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image' => $imagePath,
        ]);

        // Envoyer une notification database à tous les utilisateurs
        $users = User::all();

        Notification::send($users, new NewEvenementNotification($evenement));

        return back()->with('success', 'Information partagée avec succès.');
    }

    public function destroy(Evenements $evenement)
    {
        if ($evenement->image && Storage::disk('public')->exists($evenement->image)) {
            Storage::disk('public')->delete($evenement->image);
        }

        $evenement->delete();

        return back()->with('success', 'Information supprimée avec succès.');
    }
}