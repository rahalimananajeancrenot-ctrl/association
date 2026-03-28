<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ressource_financieres', function (Blueprint $table) {
            $table->decimal('montant', 8, 2)->after('ressource');
            $table->year('annee')->after('montant');
        });
    }

    public function down(): void
    {
        Schema::table('ressource_financieres', function (Blueprint $table) {
            $table->dropColumn(['montant', 'annee']);
        });
    }
};