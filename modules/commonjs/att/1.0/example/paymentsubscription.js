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
   text:description+' USD '+amount+' / mo + tax',
   top:2,
   left:50
});

var setSubscription = Ti.UI.createButton({
	title : 'Charge User(Subscription)',
	top : Ti.UI.Android ? "30dp" : 30,
	width : '100%',
	topInteger : 30
});

var transactionTable = Ti.UI.createTableView({
	backgroundColor : "white",
	data : [],
	top : Ti.UI.Android ? "75dp" : 75,
	width : '100%',
	height : Ti.UI.Android ? '150dp' : 150,
	borderColor : 'black',
	visible : false
});

var getSubscriptionStatus = Ti.UI.createButton({
	title : 'Subscription Status',
	top : Ti.UI.Android ? "75dp" : 75,
	width : '100%',
	topInteger : 75,
	enabled:false
});

var getSubscriptionDetails = Ti.UI.createButton({
	title : 'Subscription Details',
	top : Ti.UI.Android ? "115dp" : 115,
	width : '100%',
	topInteger : 115,
	enabled:false
});

var getNotification = Ti.UI.createButton({
	title : 'Notification',
	top : Ti.UI.Android ? "155dp" : 155,
	width : '100%',
	topInteger : 155
});

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
		getSubscriptionStatus.top = Ti.UI.Android ? getHeightToIncrease(getSubscriptionStatus.topInteger) + 'dp' : getSubscriptionStatus.top + rowHeight + height;
		getSubscriptionStatus.topInteger = Ti.UI.Android ? getHeightToIncrease(getSubscriptionStatus.topInteger) : getSubscriptionStatus.top + rowHeight + height;
		getSubscriptionDetails.top = Ti.UI.Android ? getHeightToIncrease(getSubscriptionDetails.topInteger) + 'dp' : getSubscriptionDetails.top + rowHeight + height;
		getSubscriptionDetails.topInteger = Ti.UI.Android ? getHeightToIncrease(getSubscriptionDetails.topInteger) : getSubscriptionDetails.top + rowHeight + height;
		getNotification.top = Ti.UI.Android ? getHeightToIncrease(getNotification.topInteger) + 'dp' : getNotification.top + rowHeight + height;
		getNotification.topInteger = Ti.UI.Android ? getHeightToIncrease(getNotification.topInteger) : getNotification.top + rowHeight + height;

	} else if (type === "decrease") {
		getSubscriptionStatus.top = Ti.UI.Android ? getHeightToDecrease(getSubscriptionStatus.topInteger) + 'dp' : getSubscriptionStatus.top - (rowHeight + height);
		getSubscriptionStatus.topInteger = getHeightToDecrease(getSubscriptionStatus.topInteger);
		getSubscriptionDetails.top = Ti.UI.Android ? getHeightToDecrease(getSubscriptionDetails.topInteger) + 'dp' : getSubscriptionDetails.top - (rowHeight + height);
		getSubscriptionDetails.topInteger = getHeightToDecrease(getSubscriptionDetails.topInteger);
		getNotification.top = Ti.UI.Android ? getHeightToDecrease(getNotification.topInteger) + 'dp' : getNotification.top - (rowHeight + height);
		getNotification.topInteger = getHeightToDecrease(getNotification.topInteger);
	}
};

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
		id : transactionId
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
		 *  "body":{"TransactionOperationStatus" :"Refund","ReasonCode":"X", "RefundReasonText" : "Test JSON"},
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


/**
 *@param data is the payload to be signed by the AT&T API Gateway.
 *@param contentType- format in which data is to be sent
 * Example:
 *  contentType @ application/json
 *  "data":{
 "Amount" : '0.99',
 "Category" : 1,
 "Channel" : "MOBILE_WEB",
 "Description" : "TEST",
 "MerchantTransactionId" : "skuser" + ticks,
 "MerchantProductId" : "l" + ticks,
 "MerchantPaymentRedirectUrl" : "http://att.somee.com/ATTNotifications/PaymentSuccess.aspx",
 "MerchantSubscriptionIdList" : 'ML1234567890',
 "IsPurchaseOnNoActiveSubscription" : false,
 "SubscriptionRecurrences" : 99999,
 "SubscriptionPeriod" : 'MONTHLY',
 "SubscriptionPeriodAmount" : 1
 },
 * contentType @ application/xml
 "body":"<NewTransactionRequest> <Amount>0.99</Amount> <Category>1</Category> <Channel>MOBILE_WEB</Channel> <Description>better than level 1</Description> <MerchantTransactionId>skuser2985trx20111029175423</MerchantTransactionId> <MerchantProductId>level2</MerchantProductId>  <MerchantPaymentRedirectUrl>http://somewhere.com/PurchaseFulfillment </MerchantPaymentRedirectUrl> </NewTransactionRequest>",
 **/
function signPayload() {
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
        //New Subscription call
		attAPIs.ATT.Payment.newSubscription({
			"signedDocument" : signedDocument,
			"signature" : signature,
			'clientId' : accessKey
		}, function(data) {
			webview = Titanium.UI.createWebView({
				url : data
			});
			webview.addEventListener('load', function(e) {
				var url = webview.getUrl(), index;
				Ti.API.info('url is' + url);

				if (url.indexOf('SubscriptionAuthCode') !== -1) {
					index = url.indexOf("SubscriptionAuthCode");
					Ti.App.subscriptionAuthCode = url.substr(index + 21, url.length + 1);
					responseWindow.remove(webview);
					responseWindow.close();
					getSubscriptionStatus.enabled=true;
					getSubscriptionDetails.enabled=true;
					
				}
			});

			responseWindow.add(webview);
			responseWindow.open();

		}, function(error) {
			Ti.API.info('Error:' + JSON.stringify(error));
			openPopUp(JSON.stringify(error));
		});

	}, function(error) {
		openPopUp(JSON.stringify(error));

	});
}

setSubscription.addEventListener('click', function() {
 signPayload();
});

/** getSubscriptionStatus can also have parameter
 MerchantTransactionId and SubscriptionId which we get in successful response of setSubscription
 **/
getSubscriptionStatus.addEventListener('click', function() {
	attAPIs.ATT.Payment.getSubscriptionStatus({
		"subscriptionAuthCode" : Ti.App.subscriptionAuthCode
	}, function(data) {
		var result = JSON.parse(data);
		// Ti.App.TransactionId = '';
		//Ti.App.SubscriptionId = result.SubscriptionId;
		Ti.App.MerchantSubscriptionId = result.MerchantSubscriptionId;
		Ti.API.info("GetSubscriptionStatus Success :" + data);

		if (Ti.App.SubscriptionId !== result.SubscriptionId) {
			Ti.App.SubscriptionId = result.SubscriptionId;
			Ti.App.SubsConsumerId = result.ConsumerId;
			createTableViewRow(result.SubscriptionId);
			transactionTable.visible = true;
			getSubscriptionStatus.enabled=false;
		}

	}, function(error) {
		Ti.API.info("GetSubscriptionStatus Error :" + error);
		openPopUp(JSON.stringify(error));
	});

});

getSubscriptionDetails.addEventListener('click', function() {
	attAPIs.ATT.Payment.getSubscriptionDetails({
		'consumerId' : Ti.App.SubsConsumerId,
		'merchantSubscriptionId' : Ti.App.MerchantSubscriptionId
	}, function(data) {
		Ti.API.info("GetSubscriptionDetails Success:" + data);
		openPopUp(data);
		getSubscriptionDetails.enabled=false;
	}, function(error) {
		Ti.API.info("GetSubscriptionDetails Error:" + error);
		openPopUp(JSON.stringify(error));
	});

});

getNotification.addEventListener('click', function() {
	var win = Ti.UI.createWindow({
		url : 'notificationUI.js',
		backgroundColor : 'white',
		modal : true,
		type:'CancelSubscription'
	});
	win.open();
});



mainWindow.add(header);
mainWindow.add(setSubscription);
mainWindow.add(getSubscriptionStatus);
mainWindow.add(getSubscriptionDetails);
mainWindow.add(getNotification);
mainWindow.add(transactionTable);
