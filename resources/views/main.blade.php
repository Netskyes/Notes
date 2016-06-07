@extends('layouts.master')

@section('title', 'Notes')
@section('styles')
<link rel="stylesheet" type="text/css" href="{{asset('css/style.css')}}">@stop
@section('scripts')


	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
@stop
@section('scripts-bottom')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.min.js"></script>
<script src="{{asset('js/notes-control.js')}}"></script>
<script type="text/babel" src="{{asset('js/ui-control.js')}}"></script>
@stop

@section('content')
	<div class="container">
		<div class="note-box">
			<div class="note-props"><input type="text" id="note-name" tabindex="1"></div>
			<textarea id="note-content" tabindex="2"></textarea>
		</div>

		<div class="note-side-container">
			<div class="header">
				<span>Notes</span>
				<button class="button" id="new-note">New Note</button>
			</div>
			<div class="note-list"></div>
		</div>
	</div>
@stop