<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class RoleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data =  parent::toArray($request);
        #region Permissions
        $removePermissions = true;
        if( $request->has('includePermissions') ){
            if($request->includePermissions == 'true' || $request->includePermissions == true){
                $removePermissions = false;
            }
        }
        if($removePermissions){
            unset($data['permissions']);
        }
        #endregion
        #region Permission Keys
        if( $request->has('includePermissionKeys') ){
            if($request->includePermissionKeys == 'true' || $request->includePermissionKeys == true){
                $data['permissions_keys'] = (collect($data['permissions']))->pluck('key');
            }
        }
        #endregion
        return $data;
    }
}
