<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPermission extends Model
{
    use HasFactory;
    protected $fillable = ["permission_id", "user_id"];
    protected $hidden = ["id", "created_at", "updated_at"];

}
