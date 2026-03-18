<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Club;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::with('club')->get(),
            'clubs' => Club::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|string|in:admin,delegate,public',
            'club_id' => 'nullable|exists:clubs,id',
        ]);

        $user->update($validated);

        return redirect()->back()->with('message', 'Usuario actualizado con éxito.');
    }
}
