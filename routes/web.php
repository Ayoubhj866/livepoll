<?php

use App\Http\Controllers\PollController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

/*
    ----------POLL ROUTES---------
*/
// Publiques (visiteurs, pas besoin d'être connecté)
Route::get('/poll/{poll:uuid}', [PollController::class, 'show'])->name('polls.show');
Route::get('/poll/{poll:uuid}/results', [PollController::class, 'results'])->name('polls.results');
Route::post('/poll/{poll:uuid}/vote', [VoteController::class, 'store'])->name('votes.store');

// show all active poll for the public
Route::post('/polls/all', [PollController::class, 'all'])->name('polls.all');


// Protection (creator only that can visite theses routes)
Route::middleware('auth')->group(function () {
    Route::get('/polls', [PollController::class, 'index'])->name('polls.index'); // show all polls
    Route::get('/polls/create', [PollController::class, 'create'])->name('polls.create'); // show the page to create new poll
    Route::post('/polls', [PollController::class, 'store'])->name('polls.store'); // store the new poll created by the creator
    Route::get('/polls/{poll:uuid}/edit', [PollController::class, 'edit'])->name('polls.edit'); // edit a created poll
    Route::patch('/polls/{poll:uuid}', [PollController::class, 'update'])->name('polls.update'); // update a created poll
    Route::delete('/polls/{poll:uuid}', [PollController::class, 'destroy'])->name('polls.destroy'); // delete a exist poll from database
});

require __DIR__.'/settings.php';
