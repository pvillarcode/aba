<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'home_club_id', 'away_club_id', 'date',
        'home_score', 'away_score', 'status', 'category',
        'home_q1', 'home_q2', 'home_q3', 'home_q4',
        'away_q1', 'away_q2', 'away_q3', 'away_q4',
        'delegate_comments', 'stage', 'season_id', 'gender'
    ];

    protected $casts = [
        'date' => 'datetime',
        'season_id' => 'integer'
    ];

    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    public function homeClub()
    {
        return $this->belongsTo(Club::class, 'home_club_id');
    }

    public function awayClub()
    {
        return $this->belongsTo(Club::class, 'away_club_id');
    }

    public function statistics()
    {
        return $this->hasMany(Statistic::class);
    }
}
