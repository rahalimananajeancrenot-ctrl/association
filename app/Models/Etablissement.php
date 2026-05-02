<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etablissement extends Model
{
    protected $fillable = [
        'etablissement',
    ];
    
     public function users()
    {
        return $this->hasMany(User::class);
    }

}
