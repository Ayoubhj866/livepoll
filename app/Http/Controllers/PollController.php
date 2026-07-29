<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePollRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
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
        return Inertia::render('polls/create');
    }

    public function update()
    {
        return null; // show the update poll form for the creator to udate the poll
    }

    public function store(StorePollRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $poll = DB::transaction(function () use ($validated, $request) {
            $poll = $request->user()->polls()->create([
                'uuid' => Str::uuid(),
                'question' => $validated['question'],
                'description' => $validated['description'] ?? null,
                'starts_at' => $validated['starts_at'] ?? null,
                'ends_at' => $validated['ends_at'] ?? null,
                'allow_multiple_votes' => $validated['allow_multiple_votes'] ?? false,
                'is_active' => true,
            ]);

            $poll->options()->createMany(
                collect($validated['options'])
                    ->map(fn (string $label, int $index) => [
                        'label' => $label,
                        'order' => $index,
                    ])
                    ->values()
                    ->all()
            );

            return $poll;
        });

        return redirect()
            ->route('polls.index', $poll->uuid)
            ->with('success', 'Poll created successfully !');
    }


    public function destroy()
    {
        return null; // delete the poll from the database
    }

}
