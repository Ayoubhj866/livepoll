<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PollOption extends Model
{
    /** @use HasFactory<\Database\Factories\PollOptionFactory> */
    use HasFactory;

    protected $fillable = [
        'label' , 'poll_id', 'order' , 'votes_count'
    ];

    //----------------- relationship ---------------
    public function poll() : BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

    public function votes() : HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
