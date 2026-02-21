<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Etablissement;

class EtablissementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $etablissements = [
            'ENSET',
            'ESAED',
            'FLSH',
            'Médecine',
            'IUSES',
            'DEGSP',
            'Sciences',
            'ESPA',
            'ISAE',
        ];

        foreach ($etablissements as $etab) {
            Etablissement::firstOrCreate([
                'Etablissement' => $etab,
            ]);
        }
    }
}