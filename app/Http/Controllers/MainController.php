<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;


class MainController extends Controller
{
    public function index() 
    {
        $notes = Note::all();
        return view('main', compact('notes'));
    }
}
