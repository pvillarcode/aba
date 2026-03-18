<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Club;
use App\Models\Game;
use App\Models\User;
use App\Models\Statistic;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'clubsCount' => Club::count(),
            'gamesCount' => Game::count(),
            'delegatesCount' => User::where('role', 'delegate')->count(),
            'statsCount' => Statistic::count(),
        ]);
    }
}
