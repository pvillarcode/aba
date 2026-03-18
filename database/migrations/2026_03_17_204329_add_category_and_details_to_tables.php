<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clubs', function (Blueprint $table) {
            $table->text('history')->nullable();
        });

        Schema::table('games', function (Blueprint $table) {
            $table->string('category')->default('U19'); // U11, U13, U15, U17, U19
        });

        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->foreignId('club_id')->constrained('clubs')->cascadeOnDelete();
            $table->string('name');
            $table->integer('number')->nullable();
            $table->string('position')->nullable(); // Base, Escolta, Alero, Ala-Pívot, Pívot
            $table->timestamps();
        });

        Schema::table('statistics', function (Blueprint $table) {
            $table->foreignId('player_id')->nullable()->constrained('players')->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::dropIfExists('players');

        Schema::table('clubs', function (Blueprint $table) {
            $table->dropColumn('history');
        });

        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn('category');
        });

        Schema::table('statistics', function (Blueprint $table) {
            $table->dropForeign(['player_id']);
            $table->dropColumn('player_id');
        });
    }
};
