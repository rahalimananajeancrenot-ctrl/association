<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evenements extends Model
{
    protected $fillable = [
        'title',
        'image',
        'description'
    ];
}
