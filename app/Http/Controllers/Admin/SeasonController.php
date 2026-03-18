<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Season;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeasonController extends Controller
{
    public function index()
    {
        // Data Integrity Fix: Ensure only ONE season is active
        $activeSeasons = Season::where('active', true)->orderBy('created_at', 'desc')->get();
        if ($activeSeasons->count() > 1) {
            $first = $activeSeasons->shift();
            Season::whereIn('id', $activeSeasons->pluck('id'))->update(['active' => false]);
            $first->update(['active' => true]);
        } elseif ($activeSeasons->count() === 0 && Season::count() > 0) {
            Season::latest()->first()->update(['active' => true]);
        }

        return Inertia::render('Admin/Seasons/Index', [
            'seasons' => Season::orderBy('name', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:seasons,name',
        ]);

        // Explicitly set active to false during creation
        $season = Season::create(array_merge($validated, ['active' => false]));

        // If it's the only season, make it active
        if (Season::count() === 1) {
            $season->update(['active' => true]);
        }

        return redirect()->back()->with('message', 'Temporada creada.');
    }

    public function activate(Season $season)
    {
        Season::query()->update(['active' => false]);
        $season->update(['active' => true]);
        return redirect()->back()->with('message', 'Temporada activada.');
    }

    public function destroy(Season $season)
    {
        // Don't allow deleting active season unless it's the only one
        if ($season->active && Season::count() > 1) {
            return redirect()->back()->withErrors(['error' => 'No puedes eliminar la temporada activa.']);
        }
        $season->delete();
        return redirect()->back()->with('message', 'Temporada eliminada.');
    }
}
