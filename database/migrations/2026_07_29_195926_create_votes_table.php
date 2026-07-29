<?php

use App\Models\Poll;
use App\Models\PollOption;
use App\Models\User;
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
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Poll::class);
            $table->foreignIdFor(PollOption::class);
            $table->string('voter_hash'); // user the hash('sha256', ip . user_agent) — identifie un votant anonyme sans compte
            $table->foreignIdFor(User::class);
            $table->timestamps();
            $table->unique(['poll_id', 'voter_hash']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
