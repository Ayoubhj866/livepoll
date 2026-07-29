<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vote extends Model
{
    /** @use HasFactory<\Database\Factories\VoteFactory> */
    use HasFactory;


    //---------------- RELATIONSHIP---------------------
    public function poll() : BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

     public function pollOption() : BelongsTo
    {
        return $this->belongsTo(PollOption::class, 'poll_option_id');
    }
}
