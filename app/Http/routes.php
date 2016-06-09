<?php

Route::get('/', 'MainController@index');
Route::get('/login', 'MainController@login');

Route::resource('notes', 'NotesController', [
	'except' => ['create', 'edit']
]);







