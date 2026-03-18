<?php

namespace App\Http\Controllers\Delegate;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if (!$user->club_id) abort(403, 'No tienes un club asignado.');

        $games = Game::with(['homeClub', 'awayClub'])
            ->where(function($q) use ($user) {
                $q->where('home_club_id', $user->club_id)
                  ->orWhere('away_club_id', $user->club_id);
            })
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('Delegate/Games/Index', [
            'games' => $games
        ]);
    }

    public function edit(Game $game)
    {
        $user = Auth::user();
        if ($game->home_club_id != $user->club_id && $game->away_club_id != $user->club_id) {
            abort(403);
        }

        return Inertia::render('Delegate/Games/Edit', [
            'game' => $game->load(['homeClub', 'awayClub'])
        ]);
    }

    public function update(Request $request, Game $game)
    {
        $user = Auth::user();
        if ($game->home_club_id != $user->club_id && $game->away_club_id != $user->club_id) {
            abort(403);
        }

        $validated = $request->validate([
            'home_score' => 'required|integer|min:0',
            'away_score' => 'required|integer|min:0',
            'status' => 'required|in:scheduled,finished',
            'home_q1' => 'nullable|integer|min:0',
            'home_q2' => 'nullable|integer|min:0',
            'home_q3' => 'nullable|integer|min:0',
            'home_q4' => 'nullable|integer|min:0',
            'away_q1' => 'nullable|integer|min:0',
            'away_q2' => 'nullable|integer|min:0',
            'away_q3' => 'nullable|integer|min:0',
            'away_q4' => 'nullable|integer|min:0',
            'delegate_comments' => 'nullable|string',
        ]);

        $game->update($validated);

        return redirect()->route('delegate.games.index')->with('message', 'Resultado actualizado exitosamente.');
    }
}
