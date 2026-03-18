<?php

namespace App\Http\Controllers\Delegate;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Club;
use App\Models\Season;
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

    public function create()
    {
        $user = Auth::user();
        if (!$user->club_id) abort(403, 'No tienes un club asignado.');

        $activeSeason = Season::where('active', true)->first();

        return Inertia::render('Delegate/Games/Create', [
            'clubs' => Club::where('id', '!=', $user->club_id)->orderBy('name')->get(),
            'myClub' => Club::findOrFail($user->club_id),
            'seasons' => Season::orderBy('name', 'desc')->get(),
            'activeSeasonId' => $activeSeason?->id,
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

    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user->club_id) abort(403, 'No tienes un club asignado.');

        $validated = $request->validate([
            'home_club_id' => 'required|exists:clubs,id',
            'away_club_id' => 'required|exists:clubs,id|different:home_club_id',
            'date' => 'required|date',
            'category' => 'required|string|in:U11,U13,U15,U17,U19',
            'gender' => 'required|string|in:Varones,Damas',
            'season_id' => 'required|exists:seasons,id',
        ]);

        // Asegurar que al menos uno de los clubes sea el club del delegado
        if ($validated['home_club_id'] != $user->club_id && $validated['away_club_id'] != $user->club_id) {
            abort(403, 'Solo puedes crear encuentros donde participe tu club.');
        }

        Game::create([
            'home_club_id' => $validated['home_club_id'],
            'away_club_id' => $validated['away_club_id'],
            'date' => $validated['date'],
            'status' => 'scheduled',
            'category' => $validated['category'],
            'stage' => 'regular',
            'season_id' => $validated['season_id'],
            'gender' => $validated['gender'],
        ]);

        return redirect()->route('delegate.games.index')->with('message', 'Encuentro agendado con éxito.');
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
