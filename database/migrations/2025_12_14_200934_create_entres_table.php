<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('entres', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->decimal('montant');
            $table->string('description');
            $table->foreignId('caisse_id')->constrained('caisses')->onDelete('cascade');
            $table->foreignId('ressource_financiere_id')->constrained('ressource_financieres')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entres');
    }
};
