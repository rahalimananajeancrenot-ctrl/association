<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Caisse extends Model
{
    protected $fillable = [
        'montant',
    ];

     public function sortie()
    {
        return $this->hasMany(Sortie::class);
    }

     public function entre()
    {
        return $this->hasMany(Entre::class);
    }


}
