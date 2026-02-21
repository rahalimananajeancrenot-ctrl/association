<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Niveau;

class NiveauSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $niveaux = [
            'Licence',
            'Master',
        ];

        foreach ($niveaux as $niveau) {
            Niveau::firstOrCreate([
                'niveau' => $niveau,
            ]);
        }
    }
}