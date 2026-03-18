<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\Game;
use App\Models\Season;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index(Request $request)
    {
        $categories = ['U11', 'U13', 'U15', 'U17', 'U19'];
        $standings = [];

        // Get currently active season or most recent one
        $activeSeason = Season::where('active', true)->first() ?: Season::orderBy('created_at', 'desc')->first();
        
        // Allow user to filter by season and gender via query
        $selectedSeasonId = $request->query('season', $activeSeason?->id);
        $selectedSeason = Season::find($selectedSeasonId) ?: $activeSeason;
        $selectedGender = $request->query('gender', 'Varones'); // Default to Varones

        if ($selectedSeason) {
            foreach ($categories as $cat) {
                $catStandings = [];
                $clubs = Club::all();

                foreach ($clubs as $club) {
                    $games = Game::where('category', $cat)
                        ->where('gender', $selectedGender) // Filter by gender
                        ->where('status', 'finished')
                        ->where('stage', 'regular')
                        ->where('season_id', $selectedSeason->id) // Filter by season
                        ->where(function($q) use ($club) {
                            $q->where('home_club_id', $club->id)
                              ->orWhere('away_club_id', $club->id);
                        })->get();

                    if ($games->count() > 0) {
                        $wins = 0; $losses = 0; $pointsFor = 0; $pointsAgainst = 0;

                        foreach ($games as $game) {
                            if ($game->home_club_id == $club->id) {
                                $pointsFor += $game->home_score;
                                $pointsAgainst += $game->away_score;
                                if ($game->home_score > $game->away_score) $wins++; else $losses++;
                            } else {
                                $pointsFor += $game->away_score;
                                $pointsAgainst += $game->home_score;
                                if ($game->away_score > $game->home_score) $wins++; else $losses++;
                            }
                        }

                        $catStandings[] = [
                            'name' => $club->name,
                            'id' => $club->id,
                            'played' => $games->count(),
                            'wins' => $wins,
                            'losses' => $losses,
                            'points' => ($wins * 2) + $losses,
                            'pf' => $pointsFor,
                            'pa' => $pointsAgainst,
                            'diff' => $pointsFor - $pointsAgainst
                        ];
                    }
                }
                
                usort($catStandings, function($a, $b) {
                    if ($a['points'] != $b['points']) return $b['points'] - $a['points'];
                    return $b['diff'] - $a['diff'];
                });
                $standings[$cat] = $catStandings;
            }
        }

        return Inertia::render('Public/Home', [
            'clubs' => Club::with('trophies')->get(),
            'seasons' => Season::orderBy('name', 'desc')->get(),
            'currentSeason' => $selectedSeason,
            'currentGender' => $selectedGender,
            'upcomingGames' => Game::with(['homeClub', 'awayClub'])
                ->where('gender', $selectedGender)
                ->where('status', 'scheduled')
                ->where('season_id', $selectedSeason?->id)
                ->orderBy('date', 'asc')
                ->get()
                ->makeHidden(['delegate_comments'])
                ->groupBy('category'),
            'recentGames' => Game::with(['homeClub', 'awayClub'])
                ->where('gender', $selectedGender)
                ->where('status', 'finished')
                ->where('stage', 'regular')
                ->where('season_id', $selectedSeason?->id)
                ->orderBy('date', 'desc')
                ->get()
                ->makeHidden(['delegate_comments'])
                ->groupBy('category'),
            'playoffGames' => Game::with(['homeClub', 'awayClub'])
                ->where('gender', $selectedGender)
                ->where('stage', '!=', 'regular')
                ->where('season_id', $selectedSeason?->id)
                ->orderBy('date', 'desc')
                ->get()
                ->makeHidden(['delegate_comments'])
                ->groupBy('category'),
            'categories' => $categories,
            'standings' => $standings
        ]);
    }

    public function showClub(Request $request, Club $club)
    {
        $selectedGender = $request->query('gender', 'Varones');

        return Inertia::render('Public/ClubDetails', [
            'club' => $club->load([
                'players' => fn($q) => $q->where('gender', $selectedGender),
                'coaches' => fn($q) => $q->where('gender', $selectedGender),
                'trophies'
            ]),
            'currentGender' => $selectedGender,
            'upcomingGames' => Game::with(['homeClub', 'awayClub'])
                ->where('gender', $selectedGender)
                ->where(function($query) use ($club) {
                    $query->where('home_club_id', $club->id)->orWhere('away_club_id', $club->id);
                })
                ->where('status', 'scheduled')
                ->orderBy('date', 'asc')
                ->get()
                ->makeHidden(['delegate_comments']),
            'recentGames' => Game::with(['homeClub', 'awayClub'])
                ->where('gender', $selectedGender)
                ->where(function($query) use ($club) {
                    $query->where('home_club_id', $club->id)->orWhere('away_club_id', $club->id);
                })
                ->where('status', 'finished')
                ->orderBy('date', 'desc')
                ->get()
                ->makeHidden(['delegate_comments'])
        ]);
    }
}
