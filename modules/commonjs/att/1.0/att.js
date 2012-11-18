var attHelper = null, attHelper = exports;
attHelper.prepareExecutor = function(a) {
	a.preparer && !a.prepared && (a.preparer(), a.prepared = !0)
};
var BedFrame = null, BedFrame = exports;
BedFrame.PROPERTY_TYPE_ONLY_LATEST = 0;
BedFrame.PROPERTY_TYPE_SLASH_COMBINE = 1;
BedFrame.PROPERTY_TYPE_IGNORE = 2;
BedFrame.build = function bedFrameTransformObject(d, c) {
	var b = c.children || [], e, f, g, h, i;
	for (e in b)
	if (b.hasOwnProperty(e)) {
		f = b[e];
		g = f.propertyTypes || c.propertyTypes || {};
		g.children = BedFrame.PROPERTY_TYPE_IGNORE;
		for (h in c)
		if (c.hasOwnProperty(h))
			switch(g[h]||BedFrame.PROPERTY_TYPE_ONLY_LATEST) {
				case BedFrame.PROPERTY_TYPE_ONLY_LATEST:
					f[h] =
					void 0 === f[h] ? c[h] : f[h];
					break;
				case BedFrame.PROPERTY_TYPE_SLASH_COMBINE:
					i = [], c[h] && i.push(c[h]), f[h] && i.push(f[h]), f[h] = i.join("/")
			}
		f.method && !f.children ? d[f.method] = function(b) {
			return function() {
				return b.executor.apply(b, arguments)
			}
		}(f) : f.property && bedFrameTransformObject(d[f.property] = {}, f)
	}
};
var httpRequest = null, httpRequest = exports;
httpRequest.httpError = function(a, d) {
	d && d(a.responseText)
};
httpRequest.httpSuccess = function(a, d) {
	var c = null, c = a.responseText;
	d && d(c)
};
httpRequest.createHttpObject = function(a, d) {
	var c = Ti.Network.createHTTPClient();
	c.onload = function() {
		httpRequest.httpSuccess(this, a)
	};
	c.onerror = function() {
		httpRequest.httpError(this, d)
	};
	return c
};
var sha;
sha = "undefined" !== typeof exports ? exports : {};
sha.hexcase = 0;
sha.b64pad = "=";
sha.hex_sha1 = function(a) {
	return sha.rstr2hex(sha.rstr_sha1(sha.str2rstr_utf8(a)))
};
sha.b64_sha1 = function(a) {
	return sha.rstr2b64(sha.rstr_sha1(sha.str2rstr_utf8(a)))
};
sha.any_sha1 = function(a, d) {
	return sha.rstr2any(sha.rstr_sha1(sha.str2rstr_utf8(a)), d)
};
sha.hex_hmac_sha1 = function(a, d) {
	return sha.rstr2hex(sha.rstr_hmac_sha1(sha.str2rstr_utf8(a), sha.str2rstr_utf8(d)))
};
sha.b64_hmac_sha1 = function(a, d) {
	return sha.rstr2b64(sha.rstr_hmac_sha1(sha.str2rstr_utf8(a), sha.str2rstr_utf8(d)))
};
sha.any_hmac_sha1 = function(a, d, c) {
	return sha.rstr2any(sha.rstr_hmac_sha1(sha.str2rstr_utf8(a), sha.str2rstr_utf8(d)), c)
};
sha.sha1_vm_test = function() {
	return "a9993e364706816aba3e25717850c26c9cd0d89d" === sha.hex_sha1("abc")
};
sha.rstr_sha1 = function(a) {
	return sha.binb2rstr(sha.binb_sha1(sha.rstr2binb(a), 8 * a.length))
};
sha.rstr_hmac_sha1 = function(a, d) {
	var c = sha.rstr2binb(a), b, e;
	16 < c.length && ( c = sha.binb_sha1(c, 8 * a.length));
	b = Array(16);
	var f = Array(16);
	for ( e = 0; 16 > e; e += 1)
		b[e] = c[e] ^ 909522486, f[e] = c[e] ^ 1549556828;
	c = sha.binb_sha1(b.concat(sha.rstr2binb(d)), 512 + 8 * d.length);
	return sha.binb2rstr(sha.binb_sha1(f.concat(c), 672))
};
sha.rstr2hex = function(a) {
	var d = sha.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "", b, e;
	for ( e = 0; e < a.length; e += 1)
		b = a.charCodeAt(e), c += d.charAt(b >>> 4 & 15) + d.charAt(b & 15);
	return c
};
sha.rstr2b64 = function(a) {
	var d = "", c, b, e = a.length;
	for ( c = 0; c < e; c += 3) {
		var f = a.charCodeAt(c) << 16 | (c + 1 < e ? a.charCodeAt(c + 1) << 8 : 0) | (c + 2 < e ? a.charCodeAt(c + 2) : 0);
		for ( b = 0; 4 > b; b++)
			d = 8 * c + 6 * b > 8 * a.length ? d + sha.b64pad : d + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f >>> 6 * (3 - b) & 63)
	}
	return d
};
sha.rstr2any = function(a, d) {
	var c = d.length, b = [], e, f, g, h, i = Array(Math.ceil(a.length / 2));
	for ( e = 0; e < i.length; e++)
		i[e] = a.charCodeAt(2 * e) << 8 | a.charCodeAt(2 * e + 1);
	for (; 0 < i.length; ) {
		h = [];
		for ( e = g = 0; e < i.length; e++)
			if ( g = (g << 16) + i[e], f = Math.floor(g / c), g -= f * c, 0 < h.length || 0 < f)
				h[h.length] = f;
		b[b.length] = g;
		i = h
	}
	c = "";
	for ( e = b.length - 1; 0 <= e; e--)
		c += d.charAt(b[e]);
	b = Math.ceil(8 * a.length / (Math.log(d.length) / Math.log(2)));
	for ( e = c.length; e < b; e++)
		c = d[0] + c;
	return c
};
sha.str2rstr_utf8 = function(a) {
	for (var d = "", c = -1, b, e; ++c < a.length; )
		b = a.charCodeAt(c), e = c + 1 < a.length ? a.charCodeAt(c + 1) : 0, 55296 <= b && 56319 >= b && 56320 <= e && 57343 >= e && ( b = 65536 + ((b & 1023) << 10) + (e & 1023), c++), 127 >= b ? d += String.fromCharCode(b) : 2047 >= b ? d += String.fromCharCode(192 | b >>> 6 & 31, 128 | b & 63) : 65535 >= b ? d += String.fromCharCode(224 | b >>> 12 & 15, 128 | b >>> 6 & 63, 128 | b & 63) : 2097151 >= b && (d += String.fromCharCode(240 | b >>> 18 & 7, 128 | b >>> 12 & 63, 128 | b >>> 6 & 63, 128 | b & 63));
	return d
};
sha.str2rstr_utf16le = function(a) {
	var d = "", c;
	for ( c = 0; c < a.length; c++)
		d += String.fromCharCode(a.charCodeAt(c) & 255, a.charCodeAt(c) >>> 8 & 255);
	return d
};
sha.str2rstr_utf16be = function(a) {
	var d = "", c;
	for ( c = 0; c < a.length; c++)
		d += String.fromCharCode(a.charCodeAt(c) >>> 8 & 255, a.charCodeAt(c) & 255);
	return d
};
sha.rstr2binb = function(a) {
	var d = Array(a.length >> 2), c;
	for ( c = 0; c < d.length; c++)
		d[c] = 0;
	for ( c = 0; c < 8 * a.length; c += 8)
		d[c >> 5] |= (a.charCodeAt(c / 8) & 255) << 24 - c % 32;
	return d
};
sha.binb2rstr = function(a) {
	var d = "", c;
	for ( c = 0; c < 32 * a.length; c += 8)
		d += String.fromCharCode(a[c >> 5] >>> 24 - c % 32 & 255);
	return d
};
sha.binb_sha1 = function(a, d) {
	a[d >> 5] |= 128 << 24 - d % 32;
	a[(d + 64 >> 9 << 4) + 15] = d;
	var c = Array(80), b, e = 1732584193, f = -271733879, g = -1732584194, h = 271733878, i = -1009589776;
	for ( b = 0; b < a.length; b += 16) {
		var l = e, k = f, m = g, n = h, o = i, j;
		for ( j = 0; 80 > j; j++) {
			c[j] = 16 > j ? a[b + j] : sha.bit_rol(c[j - 3] ^ c[j - 8] ^ c[j - 14] ^ c[j - 16], 1);
			var p = sha.safe_add(sha.safe_add(sha.bit_rol(e, 5), sha.sha1_ft(j, f, g, h)), sha.safe_add(sha.safe_add(i, c[j]), sha.sha1_kt(j))), i = h, h = g, g = sha.bit_rol(f, 30), f = e, e = p
		}
		e = sha.safe_add(e, l);
		f = sha.safe_add(f, k);
		g = sha.safe_add(g, m);
		h = sha.safe_add(h, n);
		i = sha.safe_add(i, o)
	}
	return [e, f, g, h, i]
};
sha.sha1_ft = function(a, d, c, b) {
	return 20 > a ? d & c | ~d & b : 40 > a ? d ^ c ^ b : 60 > a ? d & c | d & b | c & b : d ^ c ^ b
};
sha.sha1_kt = function(a) {
	return 20 > a ? 1518500249 : 40 > a ? 1859775393 : 60 > a ? -1894007588 : -899497514
};
sha.safe_add = function(a, d) {
	var c = (a & 65535) + (d & 65535);
	return (a >> 16) + (d >> 16) + (c >> 16) << 16 | c & 65535
};
sha.bit_rol = function(a, d) {
	return a << d | a >>> 32 - d
};
var sessionOBJ = {
	attHelper : attHelper,
	bedFrame : BedFrame,
	httpRequest : httpRequest,
	sha : sha,
	scope : null,
	accessKeyId : null,
	secretKey : null,
	accessToken : null,
	grantType : null,
	outhCode : null,
	isAuthCode : !1,
	authToken : null
}, generateAccessToken = function(a, d) {
	var c = null, b;
	b = sessionOBJ.httpRequest.createHttpObject(function(b) {
		b = JSON.parse(b);
		!0 === sessionOBJ.isAuthCode ? (sessionOBJ.isAuthCode = !1, "Location" === d && (Ti.App.attTitaniumModuleLocationAuthToken = b.access_token, a(Ti.App.attTitaniumModuleLocationAuthToken)), "MOBO" === d && (Ti.App.attTitaniumModuleMOBOAuthToken = b.access_token, a(Ti.App.attTitaniumModuleMOBOAuthToken))) : "client_credentials" === sessionOBJ.grantType ? (Ti.App.attTitaniumModuleAccessToken = b.access_token, Ti.App.attTitaniumModuleRefreshToken = b.refresh_token, a(Ti.App.attTitaniumModuleAccessToken)) : "refresh_token" === sessionOBJ.grantType && (Ti.App.attTitaniumModuleAccessToken = b.access_token, Ti.App.attTitaniumModuleRefreshToken = b.refresh_token, a(Ti.App.attTitaniumModuleAccessToken))
	}, function(a) {
		Ti.API.info("Error in generating access token, error description: " + a)
	});
	"authorization_code" === sessionOBJ.grantType && null !== sessionOBJ.outhCode ? c = "client_id=" + sessionOBJ.accessKeyId + "&client_secret=" + sessionOBJ.secretKey + "&grant_type=" + sessionOBJ.grantType + "&code=" + sessionOBJ.outhCode : "client_credentials" === sessionOBJ.grantType ? c = "client_id=" + sessionOBJ.accessKeyId + "&client_secret=" + sessionOBJ.secretKey + "&grant_type=" + sessionOBJ.grantType + "&scope=" + sessionOBJ.scope : "refresh_token" === sessionOBJ.grantType && ( c = "client_id=" + sessionOBJ.accessKeyId + "&client_secret=" + sessionOBJ.secretKey + "&grant_type=" + sessionOBJ.grantType + "&refresh_token=" + Ti.App.attTitaniumModuleRefreshToken);
	b.open("POST", "https://api.att.com/oauth/access_token");
	b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	b.setRequestHeader("Accept", "application/json");
	b.send(c)
}, checkAccessToken = function(a) {
	Ti.App.attTitaniumModuleAccessToken ? a(Ti.App.attTitaniumModuleAccessToken) : generateAccessToken(a)
}, checkAuthToken = function(a, d) {
	"Location" === d && Ti.App.attTitaniumModuleLocationAuthToken ? a(Ti.App.attTitaniumModuleLocationAuthToken) : "MOBO" === d && Ti.App.attTitaniumModuleMOBOAuthToken ? a(Ti.App.attTitaniumModuleMOBOAuthToken) : generateAccessToken(a, d)
}, SMSExecutor = function(a, d, c) {
	sessionOBJ.attHelper.prepareExecutor(this);
	var b = this, e;
	checkAccessToken(function(f) {
		var g = sessionOBJ.httpRequest.createHttpObject(d, c);
		void 0 !== a.smsId ? g.open(b.verb, b.endPoint + b.appendUrl + a.smsId) :
		void 0 !== a.registrationId ? ( e = b.endPoint + b.appendUrl + "RegistrationID=" + a.registrationId, g.open(b.verb, e)) : g.open(b.verb, b.endPoint + b.appendUrl);
		g.setRequestHeader("Authorization", "Bearer " + f);
		void 0 !== a.contentType && g.setRequestHeader("Content-Type", a.contentType);
		void 0 !== a.accept && g.setRequestHeader("Accept", a.accept);
		"sendsms" === b.method.toLowerCase() ? "application/json" === a.contentType.toLowerCase() ? g.send(JSON.stringify(a.body)) : g.send(a.body) : g.send()
	})
}, STTExecutor = function(a, d, c) {
	sessionOBJ.attHelper.prepareExecutor(this);
	var b = this, e, f, g, h, i;
	checkAccessToken(function(l) {
		if ("android" !== Ti.Platform.osname) {
			var k = sessionOBJ.httpRequest.createHttpObject(d, c);
			k.open(b.verb, b.endPoint);
			k.setRequestHeader("Authorization", "Bearer " + l);
			void 0 !== a.xSpeechContext && k.setRequestHeader("X-SpeechContext", a.xSpeechContext);
			void 0 !== a.transferEncoding && k.setRequestHeader("Transfer-Encoding", a.transferEncoding);
			void 0 !== a.contentLength && k.setRequestHeader("Content-Length", a.contentLength);
			void 0 !== a.contentType && k.setRequestHeader("Content-Type", a.contentType);
			void 0 !== a.accept && k.setRequestHeader("Accept", a.accept);
			h = Ti.Filesystem.getFile(a.filePath);
			i = h.read();
			k.send(i)
		} else
			g = require("ti.api.att"), f = b.endPoint, e = {
				filePath : a.filePath ? a.filePath : "",
				host : f,
				headerXSpeechContent : a.xSpeechContext ? a.xSpeechContext : "",
				headerContentType : a.contentType ? a.contentType : "",
				headerAccept : a.accept ? a.accept : "",
				token : "Bearer " + l
			}, g.speechToText(e, function(b) {
				"application/xml" === a.accept ? d && d(b.success) : d && d(b)
			}, function(a) {
				c(a)
			})
	})
}, MMSExecutor = function(a, d, c) {
	sessionOBJ.attHelper.prepareExecutor(this);
	var b = this, e, f, g;
	checkAccessToken(function(h) {
		if ("sendmms" === b.method.toLowerCase()) {
			var i = require("ti.api.att");
			e = b.endPoint + b.appendUrl;
			f = {
				body : a.body ? a.body : "",
				contentType : a.contentType ? a.contentType : "",
				accept : a.accept,
				accessToken : "Bearer " + h,
				url : e,
				attachments : a.attachments && 0 < a.attachments.length ? a.attachments : [{}]
			};
			i.sendMMS(f, function(b) {
				"application/xml" === a.accept ? d && d(b.success) : d && d(b)
			}, function(a) {
				c(a)
			})
		} else
			g = sessionOBJ.httpRequest.createHttpObject(d, c),
			void 0 !== a.id && ( e = b.endPoint + b.appendUrl + "/" + a.id), g.open(b.verb, e), g.setRequestHeader("Authorization", "Bearer " + h),
			void 0 !== a.accept && g.setRequestHeader("Accept", a.accept), g.send()
	})
}, MOBOExecutor = function(a, d, c) {
	sessionOBJ.attHelper.prepareExecutor(this);
	var b = this, e = sessionOBJ.httpRequest.createHttpObject(d, c);
	sessionOBJ.isAuthCode = !0;
	checkAuthToken(function(f) {
		var g, h;
		"sendmessage" === b.method.toLowerCase() ? ( h = require("ti.api.att"), g = b.endPoint, f = {
			body : a.body ? a.body : "",
			contentType : a.contentType ? a.contentType : "",
			accept : a.accept,
			accessToken : "Bearer " + f,
			url : g,
			attachments : a.attachments && 0 < a.attachments.length ? a.attachments : [{}]
		}, h.sendMessage(f, function(b) {
			"application/xml" === a.accept ? d && d(b.success) : d && d(b)
		}, function(a) {
			c(a)
		})) : ("getmessageheaders" === b.method.toLowerCase() ? g =
		void 0 !== a.indexCursor ? b.endPoint + "?HeaderCount=" + a.headerCount + "&IndexCursor=" + Ti.Network.encodeURIComponent(a.indexCursor) : g = b.endPoint + "?HeaderCount=" + a.headerCount : "getmessagecontent" === b.method.toLowerCase() && ( g =
		void 0 !== a.partNumber ? b.endPoint + "/" + a.messageId + "/" + a.partNumber : b.endPoint + "/" + a.messageId), e.open(b.verb, g), e.setRequestHeader("Authorization", "Bearer " + f),
		void 0 !== a.accept && e.setRequestHeader("Accept", a.accept), e.send())
	}, "MOBO")
}, OAUTHExecutor = function(a, d, c) {
	sessionOBJ.attHelper.prepareExecutor(this);
	d = sessionOBJ.httpRequest.createHttpObject(d, c);
	d.open(this.verb,
	void 0 !== a.clientId &&
	void 0 !== a.scope ?
	void 0 !== a.redirectUrl ? this.endPoint + this.appendUrl + "?client_id=" + a.clientId + "&scope=" + a.scope + "&redirect_url=" + a.redirectUrl : this.endPoint + this.appendUrl + "?client_id=" + a.clientId + "&scope=" + a.scope : this.endPoint + this.appendUrl);
	d.send()
}, SendWAPPushExecutor = function(a, d, c) {
	sessionOBJ.attHelper.prepareExecutor(this);
	var b = this, e, f;
	checkAccessToken(function(g) {
		f = require("ti.api.att");
		e = b.endPoint;
		f.sendWapPush({
			url : e,
			accessToken : "Bearer " + g,
			body : a.body ? a.body : "null",
			data : a.data ? a.data : "null",
			contentType : a.contentType ? a.contentType : "",
			accept : a.accept ? a.accept : ""
		}, function(b) {
			"application/xml" === a.accept ? d && d(b.success) : d && d(b)
		}, function(a) {
			c(a)
		})
	})
}, NOTARYExecutor = function(a, d, c) {
	sessionOBJ.attHelper.prepareExecutor(this);
	var b = this;
	checkAccessToken(function() {
		var e = sessionOBJ.httpRequest.createHttpObject(d, c);
		e.open(b.verb, b.endPoint);
		void 0 !== a.clientId && e.setRequestHeader("Client_id", a.clientId);
		"android" !== Ti.Platform.osname && e.setRequestHeader("Content-Length", a.contentLength);
		void 0 !== a.clientSecret && e.setRequestHeader("Client_secret", a.clientSecret);
		void 0 !== a.contentType && e.setRequestHeader("Content-Type", a.contentType);
		void 0 !== a.accept && e.setRequestHeader("Accept", a.accept);
		void 0 !== a.data.MerchantPaymentRedirectUrl && (a.data.MerchantPaymentRedirectUrl = a.data.MerchantPaymentRedirectUrl + "?token=" + sessionOBJ.accessToken);
		e.send(JSON.stringify(a.data))
	})
}, PaymentExecutor = function(a, d, c) {
	var b = this, e = sessionOBJ.httpRequest.createHttpObject(d, c), f;
	sessionOBJ.attHelper.prepareExecutor(this);
	"newtransaction" === b.method.toLowerCase() || "newsubscription" === b.method.toLowerCase() ? d(this.endPoint + this.appendUrl + "?Signature=" + a.signature + "&SignedPaymentDetail=" + a.signedDocument + "&clientid=" + a.clientId) : "refundtransaction" === b.method.toLowerCase() ? ( refundTransaction = function(c) {
		f = b.endPoint + b.appendUrl + "/" + a.transactionId + "?Action=" + a.action;
		e.open(b.verb, f);
		e.setRequestHeader("Authorization", "Bearer " + c);
		void 0 !== a.contentType && e.setRequestHeader("Content-Type", a.contentType);
		void 0 !== a.accept && e.setRequestHeader("Accept", a.accept);
		"application/json" === a.contentType ? e.send(JSON.stringify(a.body)) : e.send(a.body)
	}, checkAccessToken(refundTransaction)) : checkAccessToken(function(c) {
		"getsubscriptionstatus" === b.method.toLowerCase() ? a.subscriptionId ? f = b.endPoint + b.appendUrl + "SubscriptionId/" + a.subscriptionId : a.merchantTransactionId ? f = b.endPoint + b.appendUrl + "MerchantTransactionId/" + a.merchantTransactionId : a.subscriptionAuthCode && ( f = b.endPoint + b.appendUrl + "SubscriptionAuthCode/" + a.subscriptionAuthCode) : "gettransactionstatus" === b.method.toLowerCase() ? a.transactionId ? f = b.endPoint + b.appendUrl + "TransactionId/" + a.transactionID : a.merchantTransactionId ? f = b.endPoint + b.appendUrl + "MerchantTransactionId/" + a.merchantTransactionId : a.transactionAuthCode && ( f = b.endPoint + b.appendUrl + "TransactionAuthCode/" + a.transactionAuthCode) : "getnotification" === b.method.toLowerCase() || "acknowleadgenotification" === b.method.toLowerCase() ? f = b.endPoint + b.appendUrl + a.notificationId : "getsubscriptiondetails" === b.method.toLowerCase() && ( f = b.endPoint + b.appendUrl + a.merchantSubscriptionId + "/Detail/" + a.consumerId);
		e.open(b.verb, f);
		e.setRequestHeader("Authorization", "Bearer " + c);
		void 0 !== a.accept && e.setRequestHeader("Accept", a.accept);
		e.send()
	})
}, LOCATIONExecutor = function(a, d, c) {
	sessionOBJ.attHelper.prepareExecutor(this);
	var b = this;
	sessionOBJ.isAuthCode = !0;
	checkAuthToken(function(e) {
		var f = sessionOBJ.httpRequest.createHttpObject(d, c), g, h = b.endPoint, i = "";
		if (
		void 0 !== a.requestedAccuracy ||
		void 0 !== a.tolerance ||
		void 0 !== a.acceptableAccuracy) {
			for (g in a)a.hasOwnProperty(g) && "Accept" !== g && ( i = i + "&" + g + "=" + a[g]);
			i = i.substr(1, i.length);
			h = b.endPoint + "?" + i
		}
		f.open(b.verb, h);
		f.setRequestHeader("Authorization", "Bearer " + e);
		void 0 !== a.accept ? f.setRequestHeader("Accept", a.accept) :
		void 0 !== b.accept && f.setRequestHeader("Accept", b.accept);
		f.send()
	}, "Location")
}, ATT = {
	authorize : function(a, d, c, b, e) {
		sessionOBJ.accessKeyId = a;
		sessionOBJ.secretKey = d;
		sessionOBJ.scope = c;
		sessionOBJ.grantType = b;
		sessionOBJ.outhCode = e
	}
};
sessionOBJ.bedFrame.build(ATT, {
	verb : "POST",
	preparer : function() {
		this.action || (this.action = this.method.substr(0, 1).toUpperCase() + this.method.substr(1))
	},
	children : [{
		property : "SMS",
		endPoint : "https://api.att.com/rest/sms/2/messaging",
		executor : SMSExecutor,
		children : [{
			method : "sendSMS",
			appendUrl : "/outbox"
		}, {
			method : "getSMSDeliveryStatus",
			appendUrl : "/outbox/",
			verb : "GET"
		}, {
			method : "getSMS",
			verb : "GET",
			appendUrl : "/inbox?"
		}]
	}, {
		property : "MMS",
		endPoint : "https://api.att.com/rest/mms/2/messaging",
		executor : MMSExecutor,
		children : [{
			method : "sendMMS",
			appendUrl : "/outbox"
		}, {
			method : "getMMSDeliveryStatus",
			appendUrl : "/outbox",
			verb : "GET"
		}]
	}, {
		property : "OAuth",
		endPoint : "https://api.att.com/oauth",
		executor : OAUTHExecutor,
		children : [{
			method : "obtainEndUserAuthorization",
			appendUrl : "/authorize",
			verb : "GET"
		}]
	}, {
		property : "WAPPush",
		endPoint : "https://api.att.com/1/messages/outbox/wapPush",
		executor : SendWAPPushExecutor,
		children : [{
			method : "sendWAPPush"
		}]
	}, {
		property : "Location",
		endPoint : "https://api.att.com/2/devices/location",
		executor : LOCATIONExecutor,
		children : [{
			method : "getDeviceLocation",
			verb : "GET"
		}]
	}, {
		property : "MOBO",
		endPoint : "https://api.att.com/rest/1/MyMessages",
		executor : MOBOExecutor,
		children : [{
			method : "sendMessage"
		}, {
			method : "getMessageHeaders",
			verb : "GET"
		}, {
			method : "getMessageContent",
			verb : "GET"
		}]
	}, {
		property : "Speech",
		endPoint : "https://api.att.com/rest/1/SpeechToText",
		executor : STTExecutor,
		children : [{
			method : "speechToText"
		}]
	}, {
		property : "Notary",
		endPoint : "https://api.att.com/Security/Notary/Rest/1/SignedPayload",
		executor : NOTARYExecutor,
		children : [{
			method : "signedPayload"
		}]
	}, {
		property : "Payment",
		endPoint : "https://api.att.com",
		executor : PaymentExecutor,
		children : [{
			method : "newTransaction",
			appendUrl : "/rest/3/Commerce/Payment/Transactions",
			verb : "GET"
		}, {
			method : "getTransactionStatus",
			appendUrl : "/rest/3/Commerce/Payment/Transactions/",
			verb : "GET"
		}, {
			method : "newSubscription",
			appendUrl : "/rest/3/Commerce/Payment/Subscriptions",
			verb : "GET"
		}, {
			method : "getSubscriptionStatus",
			appendUrl : "/rest/3/Commerce/Payment/Subscriptions/",
			verb : "GET"
		}, {
			method : "refundTransaction",
			appendUrl : "/rest/3/Commerce/Payment/Transactions",
			verb : "PUT"
		}, {
			method : "getSubscriptionDetails",
			appendUrl : "/rest/3/Commerce/Payment/Subscriptions/",
			verb : "GET"
		}, {
			method : "getNotification",
			appendUrl : "/rest/3/Commerce/Payment/Notifications/",
			verb : "GET"
		}, {
			method : "acknowleadgeNotification",
			appendUrl : "/rest/3/Commerce/Payment//Notifications/",
			verb : "PUT"
		}]
	}]
});
exports.ATT = ATT; 