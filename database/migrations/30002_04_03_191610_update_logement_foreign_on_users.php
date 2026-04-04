<?php

// use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;

// return new class extends Migration
// {
//     /**
//      * Run the migrations.
//      */
//     public function up(): void
//     {
//         Schema::table('users', function (Blueprint $table) {
//             $table->foreign('logement_id')
//                 ->references('id')
//                 ->on('logements')
//                 ->nullOnDelete();
//         });
//     }

//     /**
//      * Reverse the migrations.
//      */
//     public function down(): void
//     {
//         //
//     }
// };

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            // 1. Supprimer la clé étrangère
            //$table->dropForeign(['logement_id']);

            // 2. Rendre la colonne nullable
            $table->unsignedBigInteger('logement_id')->nullable()->change();

            // 3. Recréer la clé étrangère avec SET NULL
            $table->foreign('logement_id')
                  ->references('id')
                  ->on('logements')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropForeign(['logement_id']);

            $table->unsignedBigInteger('logement_id')->nullable(false)->change();

            $table->foreign('logement_id')
                  ->references('id')
                  ->on('logements')
                  ->cascadeOnDelete();
        });
    }
};
