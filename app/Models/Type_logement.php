<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type_logement extends Model
{
    protected $fillable = [
        'type',
    ];

    public function logements()
    {
        return $this->hasMany(Logement::class);
    }
}
