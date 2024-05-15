<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;
    protected $with = ['file'];
    public function file()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }
}