<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'logo', 'description', 'history', 'instagram_url', 'website_url'];

    public function players()
    {
        return $this->hasMany(Player::class);
    }

    public function coaches()
    {
        return $this->hasMany(Coach::class);
    }
    public function gamesHome()
    {
        return $this->hasMany(Game::class, 'home_club_id');
    }

    public function gamesAway()
    {
        return $this->hasMany(Game::class, 'away_club_id');
    }

    public function statistics()
    {
        return $this->hasMany(Statistic::class);
    }

    public function trophies()
    {
        return $this->hasMany(Trophy::class);
    }
}
