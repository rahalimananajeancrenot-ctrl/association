<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('caisses', function (Blueprint $table) {
            $table->enum('type', ['entree', 'sortie'])->after('id');
            $table->string('description')->nullable()->after('montant');
            $table->date('date_operation')->nullable()->after('description');
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete()->after('date_operation');
        });
    }

    public function down(): void
    {
        Schema::table('caisses', function (Blueprint $table) {
            $table->dropColumn(['type', 'description', 'date_operation', 'user_id']);
        });
    }
};
