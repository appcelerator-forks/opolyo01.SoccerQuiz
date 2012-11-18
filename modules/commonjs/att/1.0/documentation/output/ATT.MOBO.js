Ext.data.JsonP.ATT_MOBO({"parentMixins":[],"tagname":"class","alternateClassNames":[],"override":null,"uses":[],"inheritdoc":null,"html_meta":{},"files":[{"href":"attAPI.html#ATT-MOBO","filename":"attAPI.js"}],"linenr":340,"requires":[],"members":{"event":[],"css_mixin":[],"cfg":[],"method":[{"tagname":"method","owner":"ATT.MOBO","meta":{},"name":"getMessageContent","id":"method-getMessageContent"},{"tagname":"method","owner":"ATT.MOBO","meta":{},"name":"getMessageHeaders","id":"method-getMessageHeaders"},{"tagname":"method","owner":"ATT.MOBO","meta":{},"name":"sendMessage","id":"method-sendMessage"}],"property":[],"css_var":[]},"extends":"ATT","statics":{"event":[],"css_mixin":[],"cfg":[],"method":[],"property":[],"css_var":[]},"enum":null,"meta":{},"private":null,"superclasses":["ATT"],"component":false,"name":"ATT.MOBO","inheritable":null,"id":"class-ATT.MOBO","aliases":{},"singleton":false,"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/ATT' rel='ATT' class='docClass'>ATT</a><div class='subclass '><strong>ATT.MOBO</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/attAPI.html#ATT-MOBO' target='_blank'>attAPI.js</a></div></pre><div class='doc-contents'><p><b>Introduction:</b></p>\n\n<p>The Messaging on Behalf of (MoBo) API enables your application to send and retrieve SMS and MMS messages on behalf of your customers’ regular AT&amp;T mobile phone numbers.</p>\n\n<p><b>Description:</b></p>\n\n<p>The MoBo API allows applications to send and receive SMS and MMS on behalf of a subscriber if that subscriber has given consent. When sending a message on behalf of a subscriber, that subscriber's MSISDN is retrieved from the subscriber’s consent information. The message is then forwarded to the recipients using the subscriber's MSISDN as the sender address. A developer can make a single API request and the AT&amp;T system will determine if the request is an SMS or an MMS message and select the correct transport mechanism accordingly.</p>\n\n<br>Some major advantages of using the Messaging on Behalf of API are:\n\n\n<p>Sending messages from your application: The MoBo Send Message operation allows your customers to send text and picture messages to any U.S. mobile phone using their own AT&amp;T phone number, from within your application. Message recipients can immediately recognize who sent the message.\nReceiving messages in your application: Responses to the sent messages can be received by the user’s mobile phone or by your application using the Get Message Headers and Get Message Content operations. Your application can display messages received by the user’s mobile phone,allowing the conversation to continue from within your application.</p>\n\n<p><b>Methods:</b></p>\n\n<p>1) getMessageContent</p>\n\n<p>2) getMessageHeaders</p>\n\n<p>3) sendMessage</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-getMessageContent' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ATT.MOBO'>ATT.MOBO</span><br/><a href='source/attAPI.html#ATT-MOBO-method-getMessageContent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/ATT.MOBO-method-getMessageContent' class='name expandable'>getMessageContent</a>( <span class='pre'>options, success, error</span> ) : Object</div><div class='description'><div class='short'>Enables an application to retrieve media for one or more Subscriber Messages from the AT&amp;T Messages environment u...</div><div class='long'><p>Enables an application to retrieve media for one or more Subscriber Messages from the AT&amp;T Messages environment using information returned by the getMessageHeaders method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'><p>A JSON object containing the following properties:</p>\n<ul><li><span class='pre'>messageId</span> : String<div class='sub-desc'><p>A message identifier representing a Subscriber Message in the AT&amp;T Messages environment.</p>\n</div></li><li><span class='pre'>partNumber</span> : String (optional)<div class='sub-desc'><p>A content identifier representing an attachment in the referenced Subscriber Message.</p>\n</div></li><li><span class='pre'>accept</span> : String<div class='sub-desc'><p>Specifies the format of the body of the response. Valid values are:</p>\n\n<ul>\n<li><p>application/json</p></li>\n<li><p>application/xml</p></li>\n</ul>\n\n\n<p>The default value is: application/json</p>\n</div></li></ul></div></li><li><span class='pre'>success</span> : Function<div class='sub-desc'><p>The callback function that is called when the method returns success.</p>\n</div></li><li><span class='pre'>error</span> : Function<div class='sub-desc'><p>The callback function that is called when the method returns an error.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>An object containing the response. The format of the response (JSON or XML) is specified by the value of the accept parameter in the request.</p>\n\n<p><strong>Example:</strong></p>\n\n<p>The following is an example of the getMessageContent method.</p>\n\n<pre><code> getMessageContent({\n             'messageId' : \"MoBo message ID that you get in response of sendMessage\",\n             'partNumber' : '1'\n  }, function(data) {\n\n      success Callback\n\n  }, function(error) {\n\n      error Callback\n\n  });\n</code></pre>\n</div></li></ul></div></div></div><div id='method-getMessageHeaders' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ATT.MOBO'>ATT.MOBO</span><br/><a href='source/attAPI.html#ATT-MOBO-method-getMessageHeaders' target='_blank' class='view-source'>view source</a></div><a href='#!/api/ATT.MOBO-method-getMessageHeaders' class='name expandable'>getMessageHeaders</a>( <span class='pre'>options, success, error</span> ) : Object</div><div class='description'><div class='short'>Enables an application to retrieve meta-data for one ore more Subscriber Messages from the AT&amp;T Messages environm...</div><div class='long'><p>Enables an application to retrieve meta-data for one ore more Subscriber Messages from the AT&amp;T Messages environment..</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'><p>A JSON object containing the following properties:</p>\n<ul><li><span class='pre'>headerCount</span> : String<div class='sub-desc'><p>The number of Headers to be returned:</p>\n\n<p>Valid Range: Min = 1, Max = 500</p>\n\n<p>The value of headerCount is relative to the most recent Subscriber message.</p>\n\n<p>If indexCursor is defined, headerCount will start with the first message defined by indexCursor.</p>\n</div></li><li><span class='pre'>indexCursor</span> : String (optional)<div class='sub-desc'><p>Defines an index value at which the headerCount starts.</p>\n</div></li><li><span class='pre'>accept</span> : String<div class='sub-desc'><p>Specifies the format of the body of the response. Valid values are:</p>\n\n<ul>\n<li><p>application/json</p></li>\n<li><p>application/xml</p></li>\n</ul>\n\n\n<p>The default value is: application/json</p>\n</div></li></ul></div></li><li><span class='pre'>success</span> : Function<div class='sub-desc'><p>The callback function that is called when the method returns success.</p>\n</div></li><li><span class='pre'>error</span> : Function<div class='sub-desc'><p>The callback function that is called when the method returns an error.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>An object containing the response. The format of the response (JSON or XML) is specified by the value of the accept parameter in the request.</p>\n\n<p><strong>Example:</strong></p>\n\n<p>The following is an example of the getMessageHeaders method.</p>\n\n<pre><code>     getMessageHeaders({\n             'accept' : 'application/json',\n             'headerCount' : 500 //Valid Range: Min = 1, Max = 500 // Should be integer\n             'indexCursor' : '123' //Define an index value at which HeaderCount will start.\n      }, function(data) {\n\n          success Callback\n\n      }, function(error) {\n\n          error Callback\n\n      });\n</code></pre>\n</div></li></ul></div></div></div><div id='method-sendMessage' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='ATT.MOBO'>ATT.MOBO</span><br/><a href='source/attAPI.html#ATT-MOBO-method-sendMessage' target='_blank' class='view-source'>view source</a></div><a href='#!/api/ATT.MOBO-method-sendMessage' class='name expandable'>sendMessage</a>( <span class='pre'>options, success, error</span> ) : Object</div><div class='description'><div class='short'>Enables an application to send messages on behalf of an AT&amp;T subscriber. ...</div><div class='long'><p>Enables an application to send messages on behalf of an AT&amp;T subscriber. Each time the sendMessage method is invoked, a single message can be sent to one or more destination devices. Messages are processed synchronously and sent asynchronously to the destination.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'><p>A JSON object containing the following properties:</p>\n<ul><li><span class='pre'>body</span> : Object<div class='sub-desc'><p>An Object containing all of the parameters that a user needs to send a message on an AT&amp;T mobile device. Valid parameters are:</p>\n<ul><li><span class='pre'>Addresses</span> : Array<div class='sub-desc'><p>The MSISDN of the recipient as an Array,  For example: [\"tel:6507038846\",\"tel:6507038847\"].</p>\n</div></li><li><span class='pre'>Subject</span> : String<div class='sub-desc'><p>The subject of the message.</p>\n</div></li><li><span class='pre'>Text</span> : String<div class='sub-desc'><p>The text portion of the message . If the request is detected to be MMS then the following character sets will be supported:</p>\n\n<ul>\n<li><p>ASCII</p></li>\n<li><p>UTF-8</p></li>\n<li><p>UTF-16</p></li>\n<li><p>ISO-8859-1</p></li>\n</ul>\n\n\n<p>If the request is detected to be SMS then the following character set will be supported:</p>\n\n<ul>\n<li>ISO-8859-1</li>\n</ul>\n\n\n<p>Note: This data becomes a mandatory if Attachment(s) is NOT provided in the request.</p>\n</div></li></ul></div></li><li><span class='pre'>attachments</span> : Array<div class='sub-desc'><p>An array of JSON Objects containing three key-value pairs. i.e. <i>{fileName:\"Name of the file\",fileType:\"Type of the file\",filePath:\"Path of the file\"}</i> The File can be image,audio,video or text.</p>\n</div></li><li><span class='pre'>contentType</span> : String<div class='sub-desc'><p>Specifies the format of the message content. Valid values are:</p>\n\n<ul>\n<li><p>application/json</p></li>\n<li><p>application/xml</p></li>\n<li><p>application/x-www-form-urlencoded</p></li>\n</ul>\n\n</div></li><li><span class='pre'>accept</span> : String<div class='sub-desc'><p>Specifies the format of the body of the response. Valid values are:</p>\n\n<ul>\n<li><p>application/json</p></li>\n<li><p>application/xml</p></li>\n</ul>\n\n\n<p>The default value is: application/json</p>\n</div></li></ul></div></li><li><span class='pre'>success</span> : Function<div class='sub-desc'><p>The callback function that is called when the method returns success.</p>\n</div></li><li><span class='pre'>error</span> : Function<div class='sub-desc'><p>The callback function that is called when the method returns an error.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>An object containing the response. The format of the response (JSON or XML) is specified by the value of the accept parameter in the request.</p>\n\n<p><strong>Examples:</strong></p>\n\n<p><b>1.</b> The following example of the sendMessage method uses a contentType of 'application/json'.</p>\n\n<pre><code> sendMessage({\n              \"body\":{ \"Addresses\": [\"mail@mail.mail\",\"mail@mail.mail\",\"tel:xxxxxxxxxx\"], \"Text\": \"Hello world\", \"Subject\": \"Hi\" },\n              \"contentType\" : \"application/json\",\n              \"accept\" : \"application/json\",\n              \"attachments\" : [{\"fileName\" : \"Name of the file\",\"fileType\" : \"type of the file like : image/png\",\"filePath\" : \"Path of the file\"},{\"fileName\" : \"Name of the file\",\"fileType\" : \"type of the file like : image/png\",\"filePath\" : \"Path of the file\"}]\n   }, function(data) {\n\n      success Callback\n\n  }, function(error) {\n\n      error Callback\n\n });\n</code></pre>\n\n<p><b>2.</b> The following example of the sendMessage method uses a contentType of 'application/xml'.</p>\n\n<pre><code> sendMessage({\n               \"body\":\"&lt;MessageRequest&gt;\"+\"\\n\"+\"&lt;Addresses&gt;tel:xxxxxxxxxx,tel:xxxxxxxxxx,mail@mail.mail&lt;/Addresses&gt;\"+\"\\n\"+\"&lt;Text&gt;Hello world&lt;/Text&gt;\"+\"\\n\"+\"&lt;Subject&gt;Hi&lt;/Subject&gt;\"+\"\\n\"+\"&lt;/MessageRequest&gt;\",\n               \"contentType\" : \"application/xml\",\n               \"accept\" : \"application/json\",\n               \"attachments\" : [{\"fileName\" : \"Name of the file\",\"fileType\" : \"type of the file like : image/png\",\"filePath\" : \"Path of the file\"},{\"fileName\" : \"Name of the file\",\"fileType\" : \"type of the file like : image/png\",\"filePath\" : \"Path of the file\"}]\n   }, function(data) {\n\n      success Callback\n\n  }, function(error) {\n\n      error Callback\n\n  });\n</code></pre>\n\n<p><b>3.</b> The following example of the sendMessage method uses a contentType of 'application/x-www-form-urlencoded'.</p>\n\n<pre><code> sendMessage({\n              \"body\":\"Addresses=tel%3A%2Bxxxxxxxxxx&amp;Addresses=tel%3A%2Bxxxxxxxxxx&amp;Addresses=mail@mail.mail&amp;Text=Hello&amp;Subject=Hi\",\n              \"contentType\" : \"application/x-www-form-urlencoded\",\n              \"accept\" : \"application/json\",\n              \"attachments\" : [{\"fileName\" : \"Name of the file\",\"fileType\" : \"type of the file like : image/png\",\"filePath\" : \"Path of the file\"},{\"fileName\" : \"Name of the file\",\"fileType\" : \"type of the file like : image/png\",\"filePath\" : \"Path of the file\"}]\n   }, function(data) {\n\n      success Callback\n\n  }, function(error) {\n\n      error Callback\n\n  });\n</code></pre>\n\n<p><i>Note: xxxxxxxxxx represents an AT&amp;T wireless number</i></p>\n</div></li></ul></div></div></div></div></div></div></div>","mixedInto":[],"subclasses":[],"mixins":[]});