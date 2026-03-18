<?php

namespace App\Http\Controllers\Delegate;

use App\Http\Controllers\Controller;
use App\Models\Club;
use App\Models\Player;
use App\Models\Coach;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ClubController extends Controller
{
    public function edit()
    {
        $user = Auth::user();
        $club = $user->club;

        if (!$club) {
            return Inertia::render('Delegate/Dashboard', [
                'error' => 'No tienes un club asignado. Contacta al administrador.'
            ]);
        }

        return Inertia::render('Delegate/Club/Edit', [
            'club' => $club->load(['players', 'coaches', 'trophies']),
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $club = $user->club;

        if (!$club) abort(403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'history' => 'nullable|string',
            'logo' => 'nullable|string',
            'instagram_url' => 'nullable|url',
            'website_url' => 'nullable|url',
        ]);

        $club->update($validated);

        return redirect()->back()->with('message', 'Club actualizado con éxito.');
    }

    // Coach Management
    public function storeCoach(Request $request)
    {
        $user = Auth::user();
        $club = $user->club;
        if (!$club) abort(403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|in:Coach,Asistente',
            'category' => 'required|array',
            'category.*' => 'string|in:U11,U13,U15,U17,U19',
            'gender' => 'required|string|in:Varones,Damas',
        ]);

        $club->coaches()->create($validated);

        return redirect()->back()->with('message', 'Staff agregado.');
    }

    public function updateCoach(Request $request, Coach $coach)
    {
        $user = Auth::user();
        if ($coach->club_id !== $user->club_id) abort(403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|in:Coach,Asistente',
            'category' => 'required|array',
            'category.*' => 'string|in:U11,U13,U15,U17,U19',
            'gender' => 'required|string|in:Varones,Damas',
        ]);

        $coach->update($validated);

        return redirect()->back()->with('message', 'Staff actualizado.');
    }

    public function destroyCoach(Coach $coach)
    {
        $user = Auth::user();
        if ($coach->club_id !== $user->club_id) abort(403);

        $coach->delete();

        return redirect()->back()->with('message', 'Staff eliminado.');
    }

    public function storePlayer(Request $request)
    {
        $user = Auth::user();
        $club = $user->club;

        if (!$club) abort(403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'number' => 'required|integer',
            'position' => 'nullable|string',
            'category' => 'required|string|in:U11,U13,U15,U17,U19',
            'gender' => 'required|string|in:Varones,Damas',
        ]);

        $club->players()->create($validated);

        return redirect()->back()->with('message', 'Jugador agregado con éxito.');
    }

    public function updatePlayer(Request $request, Player $player)
    {
        $user = Auth::user();
        if ($player->club_id !== $user->club_id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'number' => 'required|integer',
            'position' => 'nullable|string',
            'category' => 'required|string|in:U11,U13,U15,U17,U19',
            'gender' => 'required|string|in:Varones,Damas',
        ]);

        $player->update($validated);

        return redirect()->back()->with('message', 'Jugador actualizado.');
    }

    public function destroyPlayer(Player $player)
    {
        $user = Auth::user();
        if ($player->club_id !== $user->club_id) {
            abort(403);
        }

        $player->delete();

        return redirect()->back()->with('message', 'Jugador eliminado.');
    }

    // Trophy Management
    public function storeTrophy(Request $request)
    {
        $user = Auth::user();
        $club = $user->club;
        if (!$club) abort(403);

        $validated = $request->validate([
            'category' => 'required|string|in:U11,U13,U15,U17,U19',
            'year' => 'required|integer|min:2025|max:' . date('Y'),
            'position' => 'required|integer|in:1,2,3',
            'type' => 'required|string|in:cup,medal',
            'gender' => 'required|string|in:Varones,Damas',
        ]);

        $club->trophies()->create($validated);

        return redirect()->back()->with('message', 'Logro registrado.');
    }

    public function destroyTrophy(\App\Models\Trophy $trophy)
    {
        $user = Auth::user();
        if ($trophy->club_id !== $user->club_id) abort(403);

        $trophy->delete();

        return redirect()->back()->with('message', 'Logro eliminado.');
    }
}
