<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PollController extends Controller
{
    // show all poll for the user
    public function index()
    {
        return Inertia::render('polls/index') ; // updated later
    }

    public function all()
    {
        return null ; // show all poll for the public
    }


    public function create ()
    {
        return null ; // show the create poll form for the creator
    }

    public function update()
    {
        return null ; // show the update poll form for the creator to udate the poll
    }

    public function store()
    {
        return null ; // store the new created poll in the database
    }


    public function destroy()
    {
        return null  ; // delete the poll from the database
    }

}
