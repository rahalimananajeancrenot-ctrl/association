<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entite extends Model
{
    protected $fillable = [
        'entite',
    ];

     public function users()
    {
        return $this->hasMany(User::class);
    }
}
