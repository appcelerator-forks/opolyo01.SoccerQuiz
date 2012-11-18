//Att common JS module needs to be required.
var attAPIs = require('att');

//Note: Application Developer should get access key and secret key by registering on www.developer.att.com website
//and creating sample Application.

var accessKey = 'add your app accessKey here';
var secretKey = 'add your app secretKey here';
var scope = 'SMS,MMS,WAP';

// some test datas.
var testTelNumber = "tel:XXXXXXXXXX";
var testMessageSubject = 'Testing ATT In App Messaging API Subject';
var testMessageText = 'Testing ATT In App Messaging API Text';

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

var isRendered = false;
renderMOBOUI = function() {
	if(!isRendered) {
		var textNumber = Ti.UI.createTextField({
			top : 20,
			right : 10,
			left : 10,
			height : Ti.UI.Android ? "40dp" : 40,
			color : 'black',
			borderColor : 'black',
			hintText : 'Enter phone number(s)'
		});
		var textSubject = Ti.UI.createTextField({
			top : 70,
			right : 10,
			left : 10,
			height : Ti.UI.Android ? "40dp" : 40,
			color : 'black',
			borderColor : 'black',
			hintText : 'Enter subject here'
		});

		var text = Ti.UI.createTextField({
			top : 115,
			right : 10,
			left : 10,
			height : Ti.UI.Android ? "40dp" : 40,
			color : 'black',
			borderColor : 'black',
			hintText : 'Enter text here'
		});
			var GetAttachment = Ti.UI.createButton({
			title : 'Attachment',
			top :  Ti.UI.Android ? "300dp" : 260,
			height : Ti.UI.Android ? "30dp" : 30,
		});
		var MoboSendMessageButton = Ti.UI.createButton({
			title : 'Send Message',
			top : Ti.UI.Android ? "340dp" : 300,
			height : Ti.UI.Android ? "30dp" : 30,
		});
		var GetMoBoMessageHeaderBtn = Ti.UI.createButton({
			title : 'Get Message Headers',
			top : Ti.UI.Android ? "380dp" : 340,
			height : Ti.UI.Android ? "30dp" : 30,
		});
		var GetMoBoMessageContentBtn = Ti.UI.createButton({
			title : 'Get Message Content',
			top : Ti.UI.Android ? "420dp" : 380,
			height : Ti.UI.Android ? "30dp" : 30,
		});
		var dispAttachment = Ti.UI.createScrollView({
			top : 170,
			left : 0,
			height : Ti.UI.Android ? "85dp" : 85,
			width : Ti.UI.FILL,
			layout : 'horizontal'
		});
		var fileArray = [], savedFile;
		GetAttachment.addEventListener('click', function(e) {"use strict";
			Titanium.Media.openPhotoGallery({
				success : function(event) {
					var image = event.media;
					var fileName = new Date().getTime() + "image.jpg";
					var file;
					if(Ti.Platform.name !== 'android') {
						file = Titanium.Filesystem.applicationDataDirectory + "/" + fileName;
					} else {
						file = Titanium.Filesystem.externalStorageDirectory + "/" + fileName;
					}
					savedFile = Titanium.Filesystem.getFile(file);
					if(!savedFile.exists()) {
						savedFile.write(event.media);
					}
					var firstFile;
					if(Ti.Platform.name !== 'android') {
						firstFile = {
							'fileName' : fileName,
							'fileType' : "image/png",
							'fileObject' : image
						};
					} else {
						firstFile = {
							'fileName' : fileName,
							'fileType' : "image/jpg",
							'filePath' : 'mnt/sdcard/' + Ti.App.id + '/' + fileName
						};
					}
					fileArray.push(firstFile);

					var pic = Ti.UI.createImageView({
						top : 8,
						left : 10,
						height : 65,
						width : 65,
						borderColor : 'black',
						image : event.media
					});

					dispAttachment.add(pic);
				},
				error : function(e) {
					Ti.API.info('Error:' + JSON.stringify(e));
				}
			});
		});

		MoboSendMessageButton.addEventListener('click', function() {
			var i, AddString = [], addArr;
			var phoneNumber = textNumber.value;
			if(phoneNumber.length > 0) {
				addArr = textNumber.value.toString().split(',');
				for( i = 0; i < addArr.length; i = i + 1) {
					AddString.push('tel:' + addArr[i]);

				}
			} else {
				AddString.push(testTelNumber);
				textNumber.value = AddString[0];
			}
			if(textSubject.value === 'Enter subject here' || textSubject.value === '') {
				textSubject.value = testMessageSubject;
			}
			if(text.value === 'Enter text here' || text.value === '') {
				text.value = testMessageText;
			}
			/**
			 *@param body- Will contain three values Addresses,Subject and Text
			 *@param contentType- format in which data is to be sent
			 * Example:
			 *  contentType @ application/json
			 *  "body":{"Addresses" :"tel:XXXXXXXXXX", "Subject" : "Test MOBO JSON", "Text" : "TEST" },
			 * contentType @ application/xml
			 "body":"<MessageRequest> <Addresses>tel:XXXXXXXXXX</Addresses> <Text>TEST</Text> <Subject>Test MOBO XML</Subject></MessageRequest>",
			 * contentType @ application/x-www-form-urlencoded
			 "body":"Addresses=tel%3A%2BXXXXXXXXXX&Text=TEST& Subject=TestMOBOURL",
			 **/

			//@param args- is send as first parameter containing body along with attachments
			var args = {
				"body" : {
					"Addresses" : AddString,
					"Text" : textSubject.value,
					"Subject" : text.value
				},
				"contentType" : "application/json",
				"accept" : "application/json",
				"attachments" : fileArray
			};
			attAPIs.ATT.MOBO.sendMessage(args, function(data) {
				responseLable.text = null;
				if(args.accept === "application/json") {
					responseLable.text = 'RESPONSE :' + JSON.stringify(data);
				} else {
					responseLable.text = 'RESPONSE :' + data;
				}
				responseWindow.open();
			}, function(error) {
				Ti.API.info('Error is' + JSON.stringify(error));
				openPopUp(JSON.stringify(error));
			});

		});

		GetMoBoMessageHeaderBtn.addEventListener('click', function() {"use strict";

			attAPIs.ATT.MOBO.getMessageHeaders({
				'accept' : 'application/json',
				'headerCount' : 500 //Valid Range: Min = 1, Max = 500 // Should be integer
			}, function(data) {
				Ti.API.info('app success : ' + data);
				Ti.App.moboId = JSON.parse(data).MessageHeadersList.Headers[0].MessageId;
				Ti.App.contentType = JSON.parse(data).MessageHeadersList.Headers[0].MmsContent[1].ContentType;
				responseLable.text = null;
				responseLable.text = 'RESPONSE :' + data;
				responseWindow.open();

			}, function(error) {
				Ti.API.info('Error is' + JSON.stringify(error));
				openPopUp(JSON.stringify(error));
			});

		});

		GetMoBoMessageContentBtn.addEventListener('click', function() {"use strict";
			attAPIs.ATT.MOBO.getMessageContent({
				'messageId' : Ti.App.moboId,
				'partNumber' : '1'
			}, function(data) {
				Ti.API.info('Length:'+data.length+'Mime Type:' + Ti.App.contentType);
				responseLable.text = null;
	            responseLable.text = 'RESPONSE Is: ' + 'Length:'+data.length+' Mime Type:' + Ti.App.contentType;
	            responseWindow.open();
			}, function(error) {
				Ti.API.info('Error is' + JSON.stringify(error));
				openPopUp(JSON.stringify(error));
			});
		});

		mainWindow.add(textNumber);
		mainWindow.add(textSubject);
		mainWindow.add(text);
		mainWindow.add(GetAttachment);
		mainWindow.add(MoboSendMessageButton);
		mainWindow.add(GetMoBoMessageHeaderBtn);
		mainWindow.add(GetMoBoMessageContentBtn);
		mainWindow.add(dispAttachment);
		isRendered = true;
	}
}
authorize(renderMOBOUI);

function authorize(renderUIcallBack) {
	if(!Ti.App.isMOBOAuthorized) {
		attAPIs.ATT.OAuth.obtainEndUserAuthorization({
			'clientId' : accessKey,
			'scope' : 'TL,MOBO,MIM',
			'redirectUrl' : 'http://www.google.com'
		}, function(data) {
			var v = Ti.UI.createWebView({
				top : 0,
				height : Ti.UI.Android?Titanium.Platform.displayCaps.platformHeight:'100%',
				width : Ti.UI.Android?Titanium.Platform.displayCaps.platformWidth:'100%',
				left : 0,
				url : 'https://auth-api.att.com/user/login?client_id=' + accessKey + '&scope=TL,MOBO,MIM&redirect_url=http://www.google.com'
			});
			v.addEventListener('load', function(e) {
				var url = v.url;
				if(url.indexOf('code') != -1) {
					var indexOfCode = url.indexOf("code");
					Ti.App.MOBOAuthCode = url.substr(indexOfCode + 5, url.length + 1);
					grantType = 'authorization_code';
					attAPIs.ATT.authorize(accessKey, secretKey, scope, grantType, Ti.App.MOBOAuthCode);
					Ti.App.isMOBOAuthorized = true;
					renderUIcallBack();
					mainWindow.remove(v);
				}
			});
			mainWindow.add(v);
		}, function(error) {
			Ti.API.info('error : ' + error);
			openPopUp(error);
		});
	} else {

		renderUIcallBack();
	}

}

mainWindow.open();

