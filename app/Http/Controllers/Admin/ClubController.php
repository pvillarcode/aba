<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\Player;
use App\Models\Coach;
use App\Models\Trophy;
use Inertia\Inertia;

class ClubController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Clubs/Index', [
            'clubs' => Club::withCount(['players', 'trophies'])->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Clubs/Edit', [
            'club' => new Club()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'history' => 'nullable|string',
            'logo' => 'nullable|string',
            'instagram_url' => 'nullable|url',
            'website_url' => 'nullable|url',
        ]);

        Club::create($validated);

        return redirect()->route('admin.clubs.index')->with('message', 'Club creado.');
    }

    public function edit(Club $club)
    {
        return Inertia::render('Admin/Clubs/Edit', [
            'club' => $club->load(['players', 'coaches', 'trophies'])
        ]);
    }

    public function update(Request $request, Club $club)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'history' => 'nullable|string',
            'logo' => 'nullable|string',
            'instagram_url' => 'nullable|url',
            'website_url' => 'nullable|url',
        ]);

        $club->update($validated);

        return redirect()->back()->with('message', 'Club actualizado.');
    }

    public function destroy(Club $club)
    {
        $club->delete();
        return redirect()->route('admin.clubs.index')->with('message', 'Club eliminado.');
    }

    // Coach Management
    public function storeCoach(Request $request, Club $club)
    {
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

    public function updateCoach(Request $request, Club $club, Coach $coach)
    {
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

    public function destroyCoach(Club $club, Coach $coach)
    {
        $coach->delete();
        return redirect()->back()->with('message', 'Staff eliminado.');
    }

    // Player Management
    public function storePlayer(Request $request, Club $club)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'number' => 'required|integer',
            'position' => 'nullable|string',
            'category' => 'required|string|in:U11,U13,U15,U17,U19',
            'gender' => 'required|string|in:Varones,Damas',
        ]);
        $club->players()->create($validated);
        return redirect()->back()->with('message', 'Jugador agregado.');
    }

    public function updatePlayer(Request $request, Club $club, Player $player)
    {
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

    public function destroyPlayer(Club $club, Player $player)
    {
        $player->delete();
        return redirect()->back()->with('message', 'Jugador eliminado.');
    }

    // Trophy Management
    public function storeTrophy(Request $request, Club $club)
    {
        $validated = $request->validate([
            'category' => 'required|string|in:U11,U13,U15,U17,U19',
            'year' => 'required|integer|min:2025|max:' . date('Y'),
            'position' => 'required|integer|in:1,2,3',
            'type' => 'required|string|in:cup,medal',
            'gender' => 'required|string|in:Varones,Damas',
        ]);
        $club->trophies()->create($validated);
        return redirect()->back()->with('message', 'Trofeo otorgado.');
    }

    public function destroyTrophy(Club $club, Trophy $trophy)
    {
        $trophy->delete();
        return redirect()->back()->with('message', 'Trofeo eliminado.');
    }
}
