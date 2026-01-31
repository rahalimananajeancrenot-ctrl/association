<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ressource_financiere extends Model
{
    protected $fillable = [
        'ressource',
    ];

     public function entre()
    {
        return $this->hasMany(Entre::class);
    }


}
