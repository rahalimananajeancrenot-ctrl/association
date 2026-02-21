<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entre extends Model
{
    protected $fillable = [
        'montant',
        'description',
        'caisse_id',
        'ressource_financiere_id'
    ];

     public function ressource_financiere()
    {
        return $this->belongsTo(Ressource_financier::class);
    }

}
