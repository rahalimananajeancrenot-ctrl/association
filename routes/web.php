<?php

use App\Http\Controllers\AttributionController;
use App\Http\Controllers\LogementController;
use App\Http\Controllers\PresidentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto']);
});

Route::middleware(['auth', 'role:Logement'])->group(function () {
    Route::resource('logements', LogementController::class);

    // ✅ FIX : suppression de la route POST dupliquée
    Route::get('/attributions', [AttributionController::class, 'index'])->name('attributions.index');
    Route::get('/attributions/create', [AttributionController::class, 'create'])->name('attributions.create');
    Route::post('/attributions', [AttributionController::class, 'store'])->name('attributions.store');

    Route::get('/logement/dashboard', [LogementController::class, 'dashboard'])->name('dashboard.logements');
});

Route::middleware(['auth', 'role:President'])
    ->prefix('president')
    ->name('president.')
    ->group(function () {

        Route::get('/dashboard', [PresidentController::class, 'dashboard'])
            ->name('dashboard');

        // ✅ FIX : utilise MembreController + ajout de la route DELETE pour la suppression
        Route::get('/membres', [PresidentController::class, 'membres'])
            ->name('membres.index');

        // ✅ FIX : route DELETE ajoutée pour la suppression d'un membre
        Route::delete('/membres/{membre}', [PresidentController::class, 'destroy'])
            ->name('membres.destroy');
    });

require __DIR__.'/auth.php';