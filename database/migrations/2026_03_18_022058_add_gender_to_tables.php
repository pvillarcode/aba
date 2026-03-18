<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('games', function (Blueprint $table) {
            $table->string('gender')->default('Varones'); // Varones, Damas
        });
        Schema::table('players', function (Blueprint $table) {
            $table->string('gender')->default('Varones'); // Varones, Damas
        });
        Schema::table('coaches', function (Blueprint $table) {
            $table->string('gender')->default('Varones'); // Varones, Damas
        });
        Schema::table('trophies', function (Blueprint $table) {
            $table->string('gender')->default('Varones'); // Varones, Damas
        });
    }

    public function down()
    {
        Schema::table('games', function (Blueprint $table) { $table->dropColumn('gender'); });
        Schema::table('players', function (Blueprint $table) { $table->dropColumn('gender'); });
        Schema::table('coaches', function (Blueprint $table) { $table->dropColumn('gender'); });
        Schema::table('trophies', function (Blueprint $table) { $table->dropColumn('gender'); });
    }
};
