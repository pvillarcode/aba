<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('seasons', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Liga 2025"
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::table('games', function (Blueprint $table) {
            $table->foreignId('season_id')->nullable()->constrained()->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropForeign(['season_id']);
            $table->dropColumn('season_id');
        });
        Schema::dropIfExists('seasons');
    }
};
