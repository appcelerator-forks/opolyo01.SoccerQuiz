var fb = Ti.Facebook.createLoginButton({
	top : 20,
	style : Ti.Facebook.BUTTON_STYLE_WIDE
});

Ti.Facebook.addEventListener('login', function(e) {
	if (e.success) {
		getUserInfo();
		alert('Logged in');
	}
});

function getUserInfo() {
	Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
		if (e.success) {
			Ti.API.info(e.result);
			alert(e.result);
		} else if (e.error) {
			alert(e.error);
		} else {
			alert('Unknown response');
		}
	});
}

$.container.add(fb); 