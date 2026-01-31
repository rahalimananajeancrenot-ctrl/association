<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    protected $fillable = [
        'niveau',
    ];

     public function users()
    {
        return $this->hasMany(User::class);
    }

    
}
