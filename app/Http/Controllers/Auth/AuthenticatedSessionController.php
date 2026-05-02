<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        // $user = User::find(6);

        // if ($user && !$user->hasRole('President')) {
        //     $user->assignRole('President');
        // }

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $roleRedirects = [
            'President' => 'president.dashboard',
            'Tresorier' => 'tresorier.dashboard',
            'Secretaire' => 'secretaire.dashboard',
            'Logement' => 'dashboard.logements',
            'Membre' => 'dashboard',
        ];

        foreach ($user->getRoleNames() as $role) {
            if (isset($roleRedirects[$role])) {
                return redirect()->route($roleRedirects[$role]);
            }
        }

        // if ($user->hasRole('President')) {
        //     return redirect()->route('president.dashboard');
        // }

        // if ($user->hasRole('Logement')) {
        //     return redirect()->route('dashboard.logements');
        // }

        return redirect()->route('dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
