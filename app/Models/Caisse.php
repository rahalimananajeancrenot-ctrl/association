<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caisse extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'montant',
        'description',
        'date_operation',
        'user_id',
    ];

    // =========================
    // 🔗 RELATIONS
    // =========================

    // Une opération de caisse appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Une caisse peut être liée à une entrée
    public function entre()
    {
        return $this->hasOne(Entre::class);
    }

    // Une caisse peut être liée à une sortie
    public function sortie()
    {
        return $this->hasOne(Sortie::class);
    }
}