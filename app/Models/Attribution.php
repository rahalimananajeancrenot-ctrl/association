<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribution extends Model
{
    protected $fillable = [
        'logement_id',
        'user_ids',
        'pdf_path',
    ];

    protected $casts = [
        'user_ids' => 'array',
    ];

    public function logement()
    {
        return $this->belongsTo(Logement::class);
    }
}