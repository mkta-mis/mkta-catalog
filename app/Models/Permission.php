<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;
    protected $fillable = ["key","title", "description"];
    protected $hidden = ["created_at", "updated_at", "laravel_through_key"];

}
