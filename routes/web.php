<?php

use App\Http\Controllers\AttributionController;
use App\Http\Controllers\LogementController;
use App\Http\Controllers\PresidentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Tresorier\TresorierController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\MembreController;
use App\Http\Controllers\SecretaireController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use Spatie\Permission\Models\Role;

Route::get('/', function () {

    // $user = User::find(7);

    // if ($user && !$user->hasRole('Tresorier')) {

    //     $role = Role::firstOrCreate([
    //         'name' => 'Tresorier'
    //     ]);

    //     $user->assignRole($role);
    // }

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});


// ✅ Dashboard général des membres SAVA-U
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ProfileController::class, 'memberDashboard'])
        ->name('dashboard');

    Route::get('/members/{user}', [ProfileController::class, 'showMember'])
        ->name('members.show');
});


// ✅ Profil utilisateur
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])
        ->name('profile.photo.update');
});


// ✅ Module Logement
Route::middleware(['auth', 'role:Logement'])->group(function () {
    Route::resource('logements', LogementController::class);

    Route::get('/attributions', [AttributionController::class, 'index'])
        ->name('attributions.index');

    Route::get('/attributions/create', [AttributionController::class, 'create'])
        ->name('attributions.create');

    Route::post('/attributions', [AttributionController::class, 'store'])
        ->name('attributions.store');

    Route::get('/logement/dashboard', [LogementController::class, 'dashboard'])
        ->name('dashboard.logements');
});


// ✅ Module Président
Route::middleware(['auth', 'role:President'])
    ->prefix('president')
    ->name('president.')
    ->group(function () {

        Route::get('/dashboard', [PresidentController::class, 'dashboard'])
            ->name('dashboard');

        Route::get('/membres', [PresidentController::class, 'membres'])
            ->name('membres.index');

        Route::delete('/membres/{membre}', [PresidentController::class, 'destroy'])
            ->name('membres.destroy');

        Route::get('/register', [RegisteredUserController::class, 'create'])
            ->name('membres.register');

        Route::post('/register', [RegisteredUserController::class, 'store'])
            ->name('membres.registered');

        Route::get('/roles', [PresidentController::class, 'roles'])
            ->name('roles.index');

        Route::patch('/roles/{user}', [PresidentController::class, 'updateRole'])
            ->name('roles.update');
    });


// ✅ Module Trésorier
Route::middleware(['auth', 'role:Tresorier'])
    ->prefix('tresorier')
    ->name('tresorier.')
    ->group(function () {

        Route::get('/dashboard', [TresorierController::class, 'dashboard'])
            ->name('dashboard');

        Route::get('/finances', [TresorierController::class, 'finances'])
            ->name('finances.index');

        Route::get('/rapports', [TresorierController::class, 'rapports'])
            ->name('rapports.index');

        Route::get('/rapports/pdf', [TresorierController::class, 'exportRapportPdf'])
            ->name('rapports.pdf');

        Route::post('/entres', [TresorierController::class, 'storeEntre'])
            ->name('entres.store');

        Route::post('/sorties', [TresorierController::class, 'storeSortie'])
            ->name('sorties.store');

        Route::post('/ressources', [TresorierController::class, 'storeRessource'])
            ->name('ressources.store');
    });


// ✅ Module Membre / Notifications
Route::middleware(['auth'])
    ->prefix('membre')
    ->name('membre.')
    ->group(function () {
        Route::get('/infos', [MembreController::class, 'infos'])
            ->name('infos');

        Route::get('/evenements', [MembreController::class, 'evenements'])
            ->name('evenements.index');

        Route::get('/notifications/{notification}', [MembreController::class, 'showNotification'])
            ->name('notifications.show');

        Route::patch('/notifications/{notification}/read', [MembreController::class, 'markNotificationAsRead'])
            ->name('notifications.read');

        Route::patch('/notifications/read-all', [MembreController::class, 'markAllNotificationsAsRead'])
            ->name('notifications.readAll');
    });


// ✅ Module Secrétaire
Route::middleware(['auth', 'role:Secretaire'])
    ->prefix('secretaire')
    ->name('secretaire.')
    ->group(function () {

        Route::get('/dashboard', [SecretaireController::class, 'index'])
            ->name('dashboard');

        Route::get('/evenements', [SecretaireController::class, 'index'])
            ->name('evenements.index');

        Route::post('/evenements', [SecretaireController::class, 'store'])
            ->name('evenements.store');

        Route::delete('/evenements/{evenement}', [SecretaireController::class, 'destroy'])
            ->name('evenements.destroy');
    });


require __DIR__.'/auth.php';