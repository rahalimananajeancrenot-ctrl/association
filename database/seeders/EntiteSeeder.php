<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EntiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $entites = [
            'GrESA',
            'AJENA',
            'AEOVA',
            'CENA-D',
        ];

        foreach ($entites as $entite) {
            DB::table('entites')->insert([
                'entite' => $entite,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}