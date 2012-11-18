Ext.data.JsonP.ATT_Notary({"parentMixins":[],"tagname":"class","alternateClassNames":[],"override":null,"uses":[],"inheritdoc":null,"html_meta":{},"files":[{"href":"attAPI.html#ATT-Notary","filename":"attAPI.js"}],"linenr":867,"requires":[],"members":{"event":[],"css_mixin":[],"cfg":[],"method":[{"tagname":"method","owner":"ATT.Notary","meta":{},"name":"signedPayload","id":"method-signedPayload"}],"property":[],"css_var":[]},"extends":"ATT","statics":{"event":[],"css_mixin":[],"cfg":[],"method":[],"property":[],"css_var":[]},"enum":null,"meta":{},"private":null,"superclasses":["ATT"],"component":false,"name":"ATT.Notary","inheritable":null,"id":"class-ATT.Notary","aliases":{},"singleton":false,"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/ATT' rel='ATT' class='docClass'>ATT</a><div class='subclass '><strong>ATT.Notary</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/attAPI.html#ATT-Notary' target='_blank'>attAPI.js</a></div></pre><div class='doc-contents'><p><b>Introduction:</b></p>\n\n<p>The Notary API is used to digitally sign content or data The digital signing mechanism of the Notary API uses a token hash, a time stamp, and a nonce, to ensure that the sender of the data ∂is who they say they are, and that the associated content indisputably came from the application that sent it andnot from an imposter.</p>\n\n<p><b>Description:</b></p>\n\n<p>The Notary API is used to encode and sign documents in a secure and tamper resistant manner. This operation must be used to encode and secure the payment detail information when using the New Transaction and New Subscription methods of the Payment API.</p>\n\n<p><b>Usage:</b></p>\n\n<p>The signedPayload method must be used to generate the inputs for the Payment.newTransaction and Payment.newSubscription methods.</p>\n\n<p><b>Methods:</b></p>\n\n<p>1) signedPayload</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-signedPayload' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ATT.Notary'>ATT.Notary</span><br/><a href='source/attAPI.html#ATT-Notary-method-signedPayload' target='_blank' class='view-source'>view source</a></div><a href='#!/api/ATT.Notary-method-signedPayload' class='name expandable'>signedPayload</a>( <span class='pre'>options, success, error</span> ) : Object</div><div class='description'><div class='short'>This API method treats the payload as an arbitrary set of text content. ...</div><div class='long'><p>This API method treats the payload as an arbitrary set of text content. This method operation is used in conjunction with the Payment.newTransaction or Payment.newSubscription invocations of the AT&amp;T Payment API.</p>\n\n<p>When calling the signedPayload method, your application is required to identify which of the standard HTTP content types (such as XML or JSON) is used to encode the document. Upon receipt of the payload body, the AT&amp;T API Gateway will repackage the content into a standard format before encoding and signing the payload for a response. After the AT&amp;T API unpacks and validates the payload content, any parameters associated with the payload are determined and the content is repackaged. The content type of the result is independent of the original content type as provided by the application.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'><p>A JSON object containing the following properties:</p>\n<ul><li><span class='pre'>data</span> : Object<div class='sub-desc'><p>A JSON Object containing the following properties:</p>\n<ul><li><span class='pre'>Amount</span> : String<div class='sub-desc'><p>The amount of the transaction expressed with a maximum of two decimal places. For example: 0.99 or 2.99.</p>\n</div></li><li><span class='pre'>Category</span> : String<div class='sub-desc'><p>The Product Category. One of the values from a predefined list.</p>\n</div></li><li><span class='pre'>Channel</span> : String<div class='sub-desc'><p>The channel through which the payload is delivered. The only supported value is MOBILE_WEB.</p>\n</div></li><li><span class='pre'>Description</span> : String<div class='sub-desc'><p>A short description of the entire Purchase. The maximum length of the String is 128 characters.</p>\n</div></li><li><span class='pre'>MerchantTransactionId</span> : String<div class='sub-desc'><p>The transaction ID in the merchant’s system. The ID must be unique for every purchase request, and consist of alphanumeric text.</p>\n</div></li><li><span class='pre'>MerchantProductId</span> : String<div class='sub-desc'><p>The product identifier, assigned by the merchant, of the product to be purchased. The maximum length of the String is 50 alphanumeric characters.</p>\n</div></li><li><span class='pre'>MerchantPaymentRedirectUrl</span> : String<div class='sub-desc'><p>The URL where control is returned to your application by the AT&amp;T Gateway. The merchant application must listen at this URL for redirects from the subscriber’s browser.</p>\n</div></li><li><span class='pre'>MerchantSubscriptionIdList</span> : String<div class='sub-desc'><p>A list of merchant subscription identifiers. The maximum length of the string is 12 alphanumeric characters.</p>\n</div></li><li><span class='pre'>IsPurchaseOnNoActiveSubscription</span> : String<div class='sub-desc'><p>For this release, the value of this property must be set to FALSE.</p>\n</div></li><li><span class='pre'>SubscriptionRecurrences</span> : String<div class='sub-desc'><p>For this release, the value of this property must be set to 99999.</p>\n</div></li><li><span class='pre'>SubscriptionPeriod</span> : String<div class='sub-desc'><p>TThe interval at which the subscription is charged. For this release, the value of this property must be set to MONTHLY.</p>\n</div></li><li><span class='pre'>SubscriptionPeriodAmount</span> : String<div class='sub-desc'><p>The number of periods, as specified in the SubscriptionPeriod property, that pass between each renewal. For this release, the value of this property must be set to 1.</p>\n</div></li></ul></div></li><li><span class='pre'>contentType</span> : String<div class='sub-desc'><p>The content type of the request. Valid values are::</p>\n\n<ul>\n<li><p>application/json</p></li>\n<li><p>application/xml</p></li>\n<li><p>application/x-www-form-urlencoded</p></li>\n</ul>\n\n</div></li><li><span class='pre'>accept</span> : String<div class='sub-desc'><p>Specifies the format of the body of the response. Valid values are:</p>\n\n<ul>\n<li><p>application/json</p></li>\n<li><p>application/xml</p></li>\n</ul>\n\n\n<p>The default value is: application/json</p>\n</div></li><li><span class='pre'>clientId</span> : String<div class='sub-desc'><p>The API Key that is assigned to the application when the developer creates an application account using the DevConnect web tool.</p>\n</div></li><li><span class='pre'>clientSecret</span> : String<div class='sub-desc'><p>The Secret Key that is assigned to the application when the developer creates an application account using the DevConnect web tool.</p>\n</div></li><li><span class='pre'>contentLength</span> : Number<div class='sub-desc'><p>The size of the entity-body, specified as a decimal number of OCTETs(For IOS Only)</p>\n</div></li></ul></div></li><li><span class='pre'>success</span> : Function<div class='sub-desc'><p>The callback function that is called when the method returns success.</p>\n</div></li><li><span class='pre'>error</span> : Function<div class='sub-desc'><p>The callback function that is called when the method returns an error.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>An object containing the response. The format of the response (JSON or XML) is specified by the value of the accept parameter in the request.</p>\n\n<p><b>Example:</b></p>\n\n<p>The following is an example of the signedPayload method.</p>\n\n<pre><code>  signedPayload({\n       'data' : {\"Amount\" : &lt;value&gt;,\n                 \"Category\" : &lt;value&gt;,\n                 \"Channel\" : &lt;value&gt;,\n                 \"Description\" : &lt;value&gt;,\n                 \"MerchantTransactionId\" : &lt;value&gt;,\n                 \"MerchantProductId\" : &lt;value&gt;,\n                 \"MerchantPaymentRedirectUrl\" : &lt;value&gt;,\n                 \"MerchantSubscriptionIdList\" : &lt;value&gt;,\n                 \"IsPurchaseOnNoActiveSubscription\" : &lt;value&gt;,\n                 \"SubscriptionRecurrences\" : &lt;value&gt;,\n                 \"SubscriptionPeriod\" : &lt;value&gt;,\n                 \"SubscriptionPeriodAmount\" : &lt;value&gt;},\n       'clientId' : &lt;accessKey value&gt;,\n       'clientSecret' : &lt;secretKey value&gt;,\n       'contentType' : 'application/json'\n },function(data) {\n\n    success Callback\n\n }, function(error) {\n\n     error Callback\n\n });\n</code></pre>\n</div></li></ul></div></div></div></div></div></div></div>","mixedInto":[],"subclasses":[],"mixins":[]});