<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecommendedProduct extends Model
{
    use HasFactory;
    protected $fillable = ["recommended_product_id", "product_id"];
    protected $hidden = [ "created_at", "updated_at"];
    protected $with = ['product'];


    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'recommended_product_id')->withOutEagerLoads()->with(['product_thumbnail']);;
    }
}
