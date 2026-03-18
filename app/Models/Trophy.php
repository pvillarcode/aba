<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trophy extends Model
{
    use HasFactory;

    protected $fillable = ['club_id', 'category', 'year', 'position', 'type', 'gender'];

    protected $casts = [
        'position' => 'integer',
        'year' => 'integer',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}
