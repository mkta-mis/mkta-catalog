<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentManagement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'data',
        'active'
    ];

    protected $casts = [
        'data' => 'array'
    ];
}
