<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PollController extends Controller
{
    // show all poll for the user
    public function index()
    {
        $owner = auth()->user(); // the connected user

        $ownedPolls = $owner->polls()
            ->with(['options' => fn ($q) => $q->orderByDesc('votes_count')])
            ->withCount('votes')
            ->get(); // return all polls that related to the connected user

        $polls = $ownedPolls->map(function ($poll) {
            $topOption = $poll->options->first(); // déjà trié par votes_count desc
            $totalVotes = $poll->votes_count;

            return [
                'id' => $poll->id,
                'uuid' => $poll->uuid,
                'question' => $poll->question,
                'status' => $poll->status, // ton accessor getStatusAttribute()
                'totalVotes' => $totalVotes,
                'endsAt' => $poll->ends_at?->format('d M Y') ?? 'Sans limite',
                'topOption' => $topOption && $totalVotes > 0 ? [
                    'label' => $topOption->label,
                    'percentage' => round(($topOption->votes_count / $totalVotes) * 100),
                ] : null,
            ];
        });

        return Inertia::render('polls/index', [
            'polls' => $polls,
        ]);
    }

    public function all()
    {
        return null; // show all poll for the public
    }


    public function create()
    {
        return null; // show the create poll form for the creator
    }

    public function update()
    {
        return null; // show the update poll form for the creator to udate the poll
    }

    public function store()
    {
        return null; // store the new created poll in the database
    }


    public function destroy()
    {
        return null; // delete the poll from the database
    }

}
