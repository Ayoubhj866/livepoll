<?php

namespace Database\Seeders;

use App\Models\Poll;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PollSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Sondage actif avec des options réalistes
        Poll::factory()
            ->for($user)
            ->create([
                'question' => 'Quel framework backend préfères-tu ?',
            ])
            ->options()
            ->createMany([
                ['label' => 'Laravel', 'order' => 1],
                ['label' => 'Symfony', 'order' => 2],
                ['label' => 'Node.js', 'order' => 3],
                ['label' => 'Django', 'order' => 4],
            ]);

        // Sondage terminé (pour tester le statut "ended")
        Poll::factory()
            ->for($user)
            ->create([
                'question' => 'Ton IDE préféré ?',
                'starts_at' => now()->subDays(10),
                'ends_at' => now()->subDay(),
            ])
            ->options()
            ->createMany([
                ['label' => 'VS Code', 'order' => 1],
                ['label' => 'PHPStorm', 'order' => 2],
            ]);

        // 5 sondages random en plus, avec 3 options chacun
        Poll::factory()
            ->count(5)
            ->for($user)
            ->has(\App\Models\PollOption::factory()->count(3), 'options')
            ->create();
    }
}
