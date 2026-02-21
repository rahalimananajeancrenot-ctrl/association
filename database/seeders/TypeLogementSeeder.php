<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeLogementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('type_logements')->insert([
            ['type' => 'pv', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'pj', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'Bloc', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'BM', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'BR', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'Maison blanche', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'Tilikambo', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}