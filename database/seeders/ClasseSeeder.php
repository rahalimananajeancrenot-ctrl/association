<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Classe;

class ClasseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classes = [
            'L1',
            'L2',
            'L3',
            'M1',
            'M2',
        ];

        foreach ($classes as $classe) {
            Classe::firstOrCreate([
                'name' => $classe,
            ]);
        }
    }
}