//Att common JS module needs to be required.
var attAPIs = require('att');

//Note: Application Developer should get access key and secret key by registering on www.developer.att.com website
//and creating sample Application.

var accessKey = 'add your app accessKey here';
var secretKey = 'add your app secretKey here';
var scope = Ti.App.Properties.getString('scope');
var grantType = 'client_credentials';
//app developer can get this values from ui also.
var amount=Ti.App.Properties.getString('amount');
var description=Ti.App.Properties.getString('description');

attAPIs.ATT.authorize(accessKey, secretKey, scope, grantType);

var webview = null;

var mainWindow = Ti.UI.currentWindow;

mainWindow.addEventListener('android:back', function(e) {
	mainWindow.close();
});

var responseWindow = Ti.UI.createWindow({
	modal : true,
	backgroundColor : 'white',
	title : 'Response'
});

responseWindow.addEventListener('android:back', function(e) {
	if (webview !== null) {
		responseWindow.remove(webview);
		webview = null;
	}
	responseWindow.close();
});

var responseWinRightNavButton = Ti.UI.createButton({
	style : Ti.UI.iPhone.SystemButtonStyle.DONE,
	title : 'close'
});

var mainWinClose = Ti.UI.createButton({
	style : Ti.UI.iPhone.SystemButtonStyle.DONE,
	title : 'close'
});

responseWinRightNavButton.addEventListener('click', function() {"use strict";
	if (webview !== null) {
		responseWindow.remove(webview);
		webview = null;
	}
	responseWindow.close();
});
mainWinClose.addEventListener('click', function() {"use strict";
	mainWindow.close();
});

// //For Iphone Only.
if (Titanium.Platform.osname !== "android") {
	responseWindow.setRightNavButton(responseWinRightNavButton);
	mainWindow.setRightNavButton(mainWinClose);
}

var responseLable = Ti.UI.createLabel({
	top : 20,
	left : 5,
	right : 5,
	height : 'auto',
	color : 'black'
});
var responseView = Ti.UI.createScrollView({

});

responseView.add(responseLable);
responseWindow.add(responseView);

function openPopUp(data) {
	responseLable.text = null;
	responseLable.text = 'RESPONSE :' + data;
	responseWindow.open();
}

var header=Ti.UI.createLabel({
   text:description+' USD '+amount+' + tax',
   top:2,
   left:50
});


var btnnewTransaction = Ti.UI.createButton({
	title : 'Charge User(Single Pay)',
	top : Ti.UI.Android ? "30dp" : 30,
	width : '100%',
	topInteger : 20,
	
});

var transactionTable = Ti.UI.createTableView({
	backgroundColor : "white",
	data : [],
	top : Ti.UI.Android ? "75dp" : 75,
	width : '100%',
	height : Ti.UI.Android ? '150dp' : 150,
	borderColor : 'black',
	visible : false,

});

var getTransactionStatus = Ti.UI.createButton({
	title : 'Transaction Status',
	top : Ti.UI.Android ? "75dp" : 75,
	width : '100%',
	topInteger : 75,
	enabled:false
});

var getNotification = Ti.UI.createButton({
	title : 'Notification',
	top : Ti.UI.Android ? "115dp" : 115,
	width : '100%',
	topInteger : 115
});

mainWindow.add(header);
mainWindow.add(btnnewTransaction);
mainWindow.add(getTransactionStatus);
mainWindow.add(getNotification);
mainWindow.add(transactionTable);


var rowHeight = 35, tableHeight = 0, intTableHeight = 0,height = 5;

var getHeightToIncrease = function(topInDp) {
	var cal = topInDp + rowHeight + height;
	return cal;
};
var getHeightToDecrease = function(topInDp) {
	var cal = topInDp - (rowHeight + height);
	return cal;
};
rearrangeButtons = function(type) {
	
	if (type === "increase") {

		getTransactionStatus.top = Ti.UI.Android ? getHeightToIncrease(getTransactionStatus.topInteger) + 'dp' : getTransactionStatus.top + rowHeight + height;
		getTransactionStatus.topInteger = Ti.UI.Android ? getHeightToIncrease(getTransactionStatus.topInteger) : getTransactionStatus.top + rowHeight + height;
		getNotification.top = Ti.UI.Android ? getHeightToIncrease(getNotification.topInteger) + 'dp' : getNotification.top + rowHeight + height;
		getNotification.topInteger = Ti.UI.Android ? getHeightToIncrease(getNotification.topInteger) : getNotification.top + rowHeight + height;
		
			} else if (type === "decrease") {
		
		getTransactionStatus.top = Ti.UI.Android ? getHeightToDecrease(getTransactionStatus.topInteger) + 'dp' : getTransactionStatus.top - (rowHeight + height);
		getTransactionStatus.topInteger = getHeightToDecrease(getTransactionStatus.topInteger);
		
		getNotification.top = Ti.UI.Android ? getHeightToDecrease(getNotification.topInteger) + 'dp' : getNotification.top - (rowHeight + height);
		getNotification.topInteger = getHeightToDecrease(getNotification.topInteger);
	
	}
};

function signPayload(callBack) {
	var date = new Date(), ticks = date.getTime(), min = 1000000000, max = 9999999999, rnd = Math.floor(Math.random() * (max - min + 1)) + min, notaryData = {
		"Amount" : amount,
		"Category" : 1,
		"Channel" : "MOBILE_WEB",
		"Description" : description,
		"MerchantTransactionId" : "skuser" + rnd,
		"MerchantProductId" : "l" + rnd,
		"MerchantPaymentRedirectUrl" : "http://att.somee.com/ATTNotifications/PaymentSuccess.aspx",
		"MerchantSubscriptionIdList" : 'ML' + rnd,
		"IsPurchaseOnNoActiveSubscription" : false,
		"SubscriptionRecurrences" : 99999,
		"SubscriptionPeriod" : 'MONTHLY',
		"SubscriptionPeriodAmount" : 1

	}, signedDocument = null, signature = null;

	attAPIs.ATT.Notary.signedPayload({
		'data' : notaryData,
		'clientId' : accessKey,
		'clientSecret' : secretKey,
		'contentType' : 'application/json'
	}, function(data) {
		Ti.API.info('app success : ' + data);
		var dataJSON = JSON.parse(data);
		signedDocument = dataJSON.SignedDocument;
		signature = dataJSON.Signature;

		//New Transacrtion Call
		attAPIs.ATT.Payment.newTransaction({
			"signedDocument" : signedDocument,
			"signature" : signature,
			'clientId' : accessKey
		}, function(data) {

			webview = Titanium.UI.createWebView({
				url : data
			});
			var index, authCode;
			webview.addEventListener('load', function(e) {
				var url = webview.getUrl();
				Ti.API.info('url is' + url);
				if (url.indexOf('TransactionAuthCode') !== -1) {
					index = url.indexOf("TransactionAuthCode");
					authCode = url.substr(index + 20, url.length + 1);
					Ti.App.AuthCode = authCode;
					responseWindow.remove(webview);
					responseWindow.close();
					getTransactionStatus.enabled=true;
				}
			});
			responseWindow.add(webview);
			responseWindow.open();
		}, function(error) {
			openPopUp(JSON.stringify(error));
		});
	}, function(error) {
		openPopUp(JSON.stringify(error));

	});
}

var createTableViewRow = function(transactionId) {
	var row = Ti.UI.createTableViewRow({
		backgroundColor : '#AFEEEE',
		height : Ti.UI.Android ? '35dp' : 35,
		name : transactionId
	});
	intTableHeight = intTableHeight + rowHeight;
	tableHeight = Ti.UI.Android ? intTableHeight + 'dp' : intTableHeight;

	var lbltransaction = Ti.UI.createLabel({
		left : 10,
		height : Ti.UI.Android ? '30dp' : 30,
		width : Ti.UI.Android ? '200dp' : 200,
		text : transactionId,
		color : 'black',
		id : transactionId,
	});
	var view = Ti.UI.createView({
	});
	var refundButton = Ti.UI.createButton({
		right : 10,
		height : Ti.UI.Android ? '30dp' : 30,
		title : 'Refund',
		id : transactionId
	});
	view.add(refundButton);
	view.add(lbltransaction);
	row.add(view);
	row.classname = 'rowWithButton';

	refundButton.addEventListener('click', function(e) {
		var rowToRemoved = e.source.id;

		/**
		 *@param body- Will contain three values TransactionOperationStatus,RefundReasonCode and RefundReasonCode
		 *@param contentType- format in which data is to be sent
		 * Example:
		 *  contentType @ application/json
		 *  "body":{"TransactionOperationStatus" :"Refund","RefundReasonCode":"X", "RefundReasonText" : "Test JSON"},
		 * contentType @ application/xml
		 *  "body" : "<RefundTransactionRequest><TransactionOperationStatus>Refunded</TransactionOperationStatus><RefundReasonCode>1</RefundReasonCode><RefundReasonText>Customer was unhappy</RefundReasonText></RefundTransactionRequest>",
		 **/

		attAPIs.ATT.Payment.refundTransaction({
			"contentType" : "application/xml",
			"body" : "<RefundTransactionRequest><TransactionOperationStatus>Refunded</TransactionOperationStatus><RefundReasonCode>1</RefundReasonCode><RefundReasonText>Customer was unhappy</RefundReasonText></RefundTransactionRequest>",
			'transactionId' : transactionId,
			'action' : 'refund'
		}, function(data) {
			Ti.API.info('RefundTransaction Success :' + data);
			openPopUp(data);
			var index = transactionTable.getIndexByName(rowToRemoved);
			transactionTable.deleteRow(index);
			if (transactionTable.data[0].rows.length < 1) {
				transactionTable.visible = false;
			}
			rearrangeButtons("decrease");

			intTableHeight = transactionTable.intHeight - rowHeight;
			tableHeight = Ti.UI.Android ? intTableHeight + 'dp' : intTableHeight;
			transactionTable.height = tableHeight;
			transactionTable.intHeight = intTableHeight;

		}, function(error) {
			Ti.API.info('RefundTransaction Error :' + error);
		});
	});
	transactionTable.appendRow(row);
	transactionTable.height = tableHeight;
	transactionTable.intHeight = intTableHeight;
	rearrangeButtons("increase");
};

btnnewTransaction.addEventListener('click', function() {
	signPayload();
});

getTransactionStatus.addEventListener('click', function() {
	Ti.API.info('auth code: ' + Ti.App.AuthCode);
	attAPIs.ATT.Payment.getTransactionStatus({
		"transactionAuthCode" : Ti.App.AuthCode

	}, function(data) {
		var result = JSON.parse(data);
		Ti.API.info('GetTransactionStatus Success :' + data);

		if (Ti.App.TransactionId !== result.TransactionId) {
			Ti.App.TransactionId = result.TransactionId;
			createTableViewRow(result.TransactionId);
			transactionTable.visible = true;
			getTransactionStatus.enabled=false;
			
		}
	}, function(error) {
		Ti.API.info('GetTransactionStatus Error :' + error);
	});
});

getNotification.addEventListener('click', function() {

	var win = Ti.UI.createWindow({
		url : 'notificationUI.js',
		backgroundColor : 'white',
		modal : true,
		type:'SuccesfulRefund'
	});
	win.open();
});

