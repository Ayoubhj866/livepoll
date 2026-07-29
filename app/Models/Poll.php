<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Poll extends Model
{
    /** @use HasFactory<\Database\Factories\PollFactory> */
    use HasFactory;


    //-----------------------relationsship--------------------
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(PollOption::class);
    }


    //-------------------ACCESSORS-----------------
    // Accessor utile pour le statut
    public function getStatusAttribute(): string
    {
        if (! $this->is_active)
            return 'closed';
        if ($this->starts_at && now()->lt($this->starts_at))
            return 'scheduled';
        if ($this->ends_at && now()->gt($this->ends_at))
            return 'ended';
        return 'active';
    }

    

}
