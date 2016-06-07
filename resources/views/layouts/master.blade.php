<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	
	<title>@yield('title')</title>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	@yield('styles')
	@yield('scripts')
</head>
<body>
    @yield('content')
</body>
</html>
@yield('scripts-bottom')