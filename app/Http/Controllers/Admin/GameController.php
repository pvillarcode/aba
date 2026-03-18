<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Game;
use Inertia\Inertia;

class GameController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Games/Index', [
            'games' => Game::with(['homeClub', 'awayClub', 'season'])->orderBy('date', 'desc')->get(),
            'clubs' => \App\Models\Club::all(),
            'seasons' => \App\Models\Season::orderBy('name', 'desc')->get(),
            'activeSeasonId' => \App\Models\Season::where('active', true)->first()?->id
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'home_club_id' => 'required|exists:clubs,id',
            'away_club_id' => 'required|exists:clubs,id|different:home_club_id',
            'date' => 'required|date',
            'status' => 'required|string|in:scheduled,finished,canceled',
            'category' => 'required|string|in:U11,U13,U15,U17,U19',
            'home_score' => 'nullable|integer|min:0',
            'away_score' => 'nullable|integer|min:0',
            'stage' => 'required|string|in:regular,quarter,semi,final',
            'season_id' => 'required|exists:seasons,id'
        ]);

        Game::create($validated);

        return redirect()->back()->with('message', 'Encuentro creado con éxito.');
    }

    public function update(Request $request, Game $game)
    {
        $validated = $request->validate([
            'home_score' => 'nullable|integer|min:0',
            'away_score' => 'nullable|integer|min:0',
            'status' => 'required|string|in:scheduled,finished,canceled',
            'date' => 'required|date',
            'category' => 'required|string|in:U11,U13,U15,U17,U19',
            'home_q1' => 'nullable|integer|min:0',
            'home_q2' => 'nullable|integer|min:0',
            'home_q3' => 'nullable|integer|min:0',
            'home_q4' => 'nullable|integer|min:0',
            'away_q1' => 'nullable|integer|min:0',
            'away_q2' => 'nullable|integer|min:0',
            'away_q3' => 'nullable|integer|min:0',
            'away_q4' => 'nullable|integer|min:0',
            'delegate_comments' => 'nullable|string',
            'stage' => 'required|string|in:regular,quarter,semi,final',
            'season_id' => 'required|exists:seasons,id'
        ]);

        $game->update($validated);

        return redirect()->back()->with('message', 'Encuentro actualizado con éxito.');
    }

    public function destroy(Game $game)
    {
        $game->delete();
        return redirect()->back()->with('message', 'Encuentro eliminado.');
    }
}
