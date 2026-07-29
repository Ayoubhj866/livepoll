<?php

namespace Database\Factories;

use App\Models\Poll;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Poll>
 */
class PollFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            'uuid' => Str::uuid(),
            'user_id' => User::factory(),
            'question' => fake()->sentence() . ' ?',
            'description' => fake()->optional()->paragraph(),
            'starts_at' => now(),
            'ends_at' => now()->addDays(7),
            'is_active' => true,
            'allow_multiple_votes' => false,
        ];
    }
}
