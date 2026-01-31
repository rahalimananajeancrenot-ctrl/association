<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Logement extends Model
{
    protected $fillable = [
        'name',
        'nbrPlace',
        'type_logement_id'
    ];

    public function type_logement()
    {
        return $this->belongsTo(Type_logement::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }


}
