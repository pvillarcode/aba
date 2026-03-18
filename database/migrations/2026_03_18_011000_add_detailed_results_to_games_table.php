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
        Schema::table('games', function (Blueprint $table) {
            $table->integer('home_q1')->nullable();
            $table->integer('home_q2')->nullable();
            $table->integer('home_q3')->nullable();
            $table->integer('home_q4')->nullable();
            $table->integer('away_q1')->nullable();
            $table->integer('away_q2')->nullable();
            $table->integer('away_q3')->nullable();
            $table->integer('away_q4')->nullable();
            $table->text('delegate_comments')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn(['home_q1', 'home_q2', 'home_q3', 'home_q4', 'away_q1', 'away_q2', 'away_q3', 'away_q4', 'delegate_comments']);
        });
    }
};
