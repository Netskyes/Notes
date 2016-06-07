<?php

Route::get('/', 'MainController@index');

Route::resource('notes', 'NotesController', [
	'except' => ['create', 'edit']
]);





