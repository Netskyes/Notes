<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;


class NotesController extends Controller
{
    public function index() 
    {
        return array('notes' => Note::orderBy('id', 'desc')->get());
    }

    public function show($id)
    {
        return array('note' => Note::find($id));
    }
    
    public function store(Request $request)
    {
        $note = new Note($request->all());
        return array('status' => ($note->save()) ? 1 : 0, 'id' => $note->id);
    }

    public function update(Request $request, $id)
    {
        $result = Note::find($id)->update($request->all());
        return array('status' => ($result) ? 1 : 0);
    }

    public function destroy($id)
    {
        return array('status' => Note::destroy($id));
    }
}
