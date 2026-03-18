<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $fillable = ['club_id', 'name', 'number', 'position', 'category', 'gender'];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function statistics()
    {
        return $this->hasMany(Statistic::class);
    }
}
