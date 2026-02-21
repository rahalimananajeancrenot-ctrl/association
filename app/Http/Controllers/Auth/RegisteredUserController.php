<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Etablissement;
use App\Models\Classe;
use App\Models\Niveau;
use App\Models\Entite;
use App\Models\Logement;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'etablissements' => Etablissement::select('id', 'etablissement')->get(),
            'classes' => Classe::select('id', 'name')->get(),
            'niveaux' => Niveau::select('id', 'niveau')->get(),
            'entites' => Entite::select('id', 'entite')->get(),
            'logements' => Logement::select('id', 'name')->get(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'contact' => 'required|string|max:20',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'etablissement_id' => 'required|exists:etablissements,id',
            'classe_id' => 'required|exists:classes,id',
            'niveau_id' => 'required|exists:niveaux,id',
            'entite_id' => 'required|exists:entites,id',
            'logement_id' => 'required|exists:logements,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'adresse' => $request->adresse,
            'contact' => $request->contact,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'etablissement_id' => $request->etablissement_id,
            'classe_id' => $request->classe_id,
            'niveau_id' => $request->niveau_id,
            'entite_id' => $request->entite_id,
            'logement_id' => $request->logement_id,
        ]);

        // Attribution automatique d’un rôle
        //$user->assignRole('Membre');

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}