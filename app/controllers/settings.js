var fb = Ti.Facebook.createLoginButton({
	top : 20,
	style : Ti.Facebook.BUTTON_STYLE_WIDE
});

Ti.Facebook.addEventListener('login', function(e) {
	if (e.success) {
		alert('Logged in');
	}
});


$.container.add(fb); 