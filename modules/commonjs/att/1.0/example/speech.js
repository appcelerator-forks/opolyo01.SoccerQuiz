//Att common JS module needs to be required.
var attAPIs = require('att');

//Note:To work with this Speech Example Application Developer will require to mount audioFile(wav/amr) in Android Emulator

//Note: Application Developer should get access key and secret key by registering on www.developer.att.com website
//and creating sample Application.

var accessKey = 'add your app accessKey here';
var secretKey = 'add your app secretKey here';
var scope = 'SMS,MMS,WAP,SPEECH';
var grantType = 'client_credentials';
//Put audio file in resource folder and add name in below "audioFileName" variable. 
//In below example, audio file name is "listening.wav""
var audioFileName = "listening.wav";

//pass accessKey and secretKey for authorization
attAPIs.ATT.authorize(accessKey, secretKey, scope, grantType);

var mainWindow = Ti.UI.createWindow({
	backgroundColor : 'white'
});
var responseWindow = Ti.UI.createWindow({
	modal : true,
	backgroundColor : 'white',
	title : 'Response'
});

responseWindow.addEventListener('android:back', function(e) {
	responseWindow.close();
});

var responseWinRightNavButton = Ti.UI.createButton({
	style : Ti.UI.iPhone.SystemButtonStyle.DONE,
	title : 'close'
});

responseWinRightNavButton.addEventListener('click', function() {"use strict";
	responseWindow.close();
});
// //For Iphone Only.
if(Titanium.Platform.osname !== "android") {
	responseWindow.setRightNavButton(responseWinRightNavButton);
}

var responseLable = Ti.UI.createLabel({
	top : 20,
	left : 5,
	right : 5,
	height : 'auto',
	color : 'black'
});

var responseView=Ti.UI.createScrollView({
});
responseView.add(responseLable);
responseWindow.add(responseView);

function openPopUp(data) {
	responseLable.text = null;
	responseLable.text = 'RESPONSE :' + data;
	responseWindow.open();
}

var speechButton = Ti.UI.createButton({
	title : 'Speech',
	top : 200
});

var argument = {
	'xSpeechContext' : 'SMS',
	'contentType' : 'audio/wav',
	'accept' : 'application/json'
};

if(Ti.Platform.osname === 'android') {
	argument.filePath = "/mnt/sdcard/" + audioFileName;
} else {
	var audioFile = Ti.Filesystem.getFile(audioFileName);
	var audioDoneListening = audioFile.read();
	var audioFilePath = audioFile.nativePath;
	var length = audioDoneListening.size;
	argument.filePath = audioFilePath;
	argument.contentLength = length;
}
speechButton.addEventListener('click', function() {"use strict";
	attAPIs.ATT.Speech.speechToText(argument, function(data) {
		if(argument.accept === 'application/xml') {
			Ti.API.info('Success : ' + data);
			openPopUp(data);
		} else {
			Ti.API.info('Success : ' + JSON.stringify(data));
			openPopUp(JSON.stringify(data));
		}
	}, function(error) {
		Ti.API.info('Error' + error);
		openPopUp(JSON.stringify(error));
	});
});
mainWindow.add(speechButton);
mainWindow.open();
