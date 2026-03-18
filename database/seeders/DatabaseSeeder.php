<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Clubs
        $history = "El club tiene una larga trayectoria en el básquetbol local, formando a grandes jugadores y compitiendo siempre en los niveles más altos del torneo Abatalca.";
        
        $club1 = \App\Models\Club::create(['name' => 'Club Montessori Talca', 'description' => 'Tradición y formación en el básquetbol talquino.', 'history' => $history]);
        $club2 = \App\Models\Club::create(['name' => 'CD Alianza Talca', 'description' => 'Competencia y compromiso regional.', 'history' => $history]);
        \App\Models\Club::create(['name' => 'CD Cumbres del Maule', 'description' => 'Desde lo más alto del Maule.', 'history' => $history]);
        \App\Models\Club::create(['name' => 'CD Comercio', 'description' => 'Un clásico del comercio y el deporte.', 'history' => $history]);
        \App\Models\Club::create(['name' => 'Halcones', 'description' => 'Vuelo alto en cada partido.', 'history' => $history]);
        \App\Models\Club::create(['name' => 'CDSC Curicó Basket', 'description' => 'Representando fielmente a Curicó.', 'history' => $history]);

        // Users
        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@abatalca.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Delegate User',
            'email' => 'delegate@abatalca.com',
            'password' => bcrypt('password'),
            'role' => 'delegate',
            'club_id' => $club1->id,
        ]);

        // Players for Club 1
        $players = ['Juan Perez', 'Diego Lopez', 'Carlos Ruiz', 'Matias Soto', 'Felipe Jara'];
        foreach ($players as $i => $name) {
            \App\Models\Player::create([
                'club_id' => $club1->id,
                'name' => $name,
                'number' => $i + 4,
                'position' => 'Base'
            ]);
        }

        // Games with Categories
        $categories = ['U13', 'U15', 'U17', 'U19'];
        foreach ($categories as $cat) {
            \App\Models\Game::create([
                'home_club_id' => $club1->id,
                'away_club_id' => $club2->id,
                'date' => now()->addDays(rand(1, 10)),
                'status' => 'scheduled',
                'category' => $cat
            ]);
            
            \App\Models\Game::create([
                'home_club_id' => $club2->id,
                'away_club_id' => $club1->id,
                'date' => now()->subDays(rand(1, 10)),
                'home_score' => rand(60, 90),
                'away_score' => rand(60, 90),
                'status' => 'finished',
                'category' => $cat
            ]);
        }
    }
}
