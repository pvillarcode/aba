<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Delegate\DashboardController as DelegateDashboardController;
use App\Http\Controllers\PublicController;

Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/club/{club}', [PublicController::class, 'showClub'])->name('public.club.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::resource('clubs', \App\Http\Controllers\Admin\ClubController::class);
        Route::post('clubs/{club}/players', [\App\Http\Controllers\Admin\ClubController::class, 'storePlayer'])->name('clubs.players.store');
        Route::put('clubs/{club}/players/{player}', [\App\Http\Controllers\Admin\ClubController::class, 'updatePlayer'])->name('clubs.players.update');
        Route::delete('clubs/{club}/players/{player}', [\App\Http\Controllers\Admin\ClubController::class, 'destroyPlayer'])->name('clubs.players.destroy');
        
        Route::post('clubs/{club}/coaches', [\App\Http\Controllers\Admin\ClubController::class, 'storeCoach'])->name('clubs.coaches.store');
        Route::put('clubs/{club}/coaches/{coach}', [\App\Http\Controllers\Admin\ClubController::class, 'updateCoach'])->name('clubs.coaches.update');
        Route::delete('clubs/{club}/coaches/{coach}', [\App\Http\Controllers\Admin\ClubController::class, 'destroyCoach'])->name('clubs.coaches.destroy');

        Route::post('clubs/{club}/trophies', [\App\Http\Controllers\Admin\ClubController::class, 'storeTrophy'])->name('clubs.trophies.store');
        Route::delete('clubs/{club}/trophies/{trophy}', [\App\Http\Controllers\Admin\ClubController::class, 'destroyTrophy'])->name('clubs.trophies.destroy');

        Route::resource('games', \App\Http\Controllers\Admin\GameController::class);
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
        Route::resource('seasons', \App\Http\Controllers\Admin\SeasonController::class);
        Route::post('seasons/{season}/activate', [\App\Http\Controllers\Admin\SeasonController::class, 'activate'])->name('seasons.activate');
    });

    Route::middleware('role:delegate')->prefix('delegate')->name('delegate.')->group(function () {
        Route::get('/dashboard', [DelegateDashboardController::class, 'index'])->name('dashboard');
        
        // Club Management
        Route::get('/club/edit', [\App\Http\Controllers\Delegate\ClubController::class, 'edit'])->name('club.edit');
        Route::put('/club', [\App\Http\Controllers\Delegate\ClubController::class, 'update'])->name('club.update');
        
        // Player Management
        Route::post('/players', [\App\Http\Controllers\Delegate\ClubController::class, 'storePlayer'])->name('players.store');
        Route::put('/players/{player}', [\App\Http\Controllers\Delegate\ClubController::class, 'updatePlayer'])->name('players.update');
        Route::delete('/players/{player}', [\App\Http\Controllers\Delegate\ClubController::class, 'destroyPlayer'])->name('players.destroy');

        // Coach Management
        Route::post('/coaches', [\App\Http\Controllers\Delegate\ClubController::class, 'storeCoach'])->name('coaches.store');
        Route::put('/coaches/{coach}', [\App\Http\Controllers\Delegate\ClubController::class, 'updateCoach'])->name('coaches.update');
        Route::delete('/coaches/{coach}', [\App\Http\Controllers\Delegate\ClubController::class, 'destroyCoach'])->name('coaches.destroy');

        // Trophy Management
        Route::post('/trophies', [\App\Http\Controllers\Delegate\ClubController::class, 'storeTrophy'])->name('trophies.store');
        Route::delete('/trophies/{trophy}', [\App\Http\Controllers\Delegate\ClubController::class, 'destroyTrophy'])->name('trophies.destroy');

        // Game/Results Management
        Route::get('/games', [\App\Http\Controllers\Delegate\GameController::class, 'index'])->name('games.index');
        Route::get('/games/create', [\App\Http\Controllers\Delegate\GameController::class, 'create'])->name('games.create');
        Route::post('/games', [\App\Http\Controllers\Delegate\GameController::class, 'store'])->name('games.store');
        Route::get('/games/{game}/edit', [\App\Http\Controllers\Delegate\GameController::class, 'edit'])->name('games.edit');
        Route::put('/games/{game}', [\App\Http\Controllers\Delegate\GameController::class, 'update'])->name('games.update');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
