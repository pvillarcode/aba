<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{
    use HasFactory;

    protected $fillable = ['club_id', 'name', 'role', 'category', 'photo_url', 'gender'];

    protected $casts = [
        'category' => 'array',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}
