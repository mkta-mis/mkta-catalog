<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ProductAccessTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data =  parent::toArray($request);
        return $data;
    }
}
