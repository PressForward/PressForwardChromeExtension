(function () {
	/**
	 * Check and set a global guard variable.
	 * If this content script is injected into the same page again,
	 * it will do nothing next time.
	 */
	console.log('bind_submit.js');
	window.setTimeout(function () {
		console.log('timeout completed, binding');
		document.querySelector("#pressforward-nt__button-container button#submit-button").addEventListener("click", (e) => {
			//document.addEventListener("click", (e) => {
			window.setTimeout(function () {
				console.log("clicked. submitting from bind_submit.js");
				console.log('Submitting to PressForward');
				let publish = true;
				let submitObject = {};
				submitObject.post_title = window.document.getElementById('pressforward-nt__inputfield__title').value;
				submitObject.item_author = window.document.getElementById('pressforward-nt__inputfield__byline').value;
				submitObject.content = window.document.getElementById('nominateText').innerHTML;
				//submitObject.item_feat_img = window.pfMetaData.image;
				submitObject.post_tags = window.document.querySelector('#pressforward-nt__preview-tags-container input').value;
				if (publish) {
					submitObject.publish = 'Last Step';
					submitObject.post_status = 'publish';
				}
				submitObject.extensionMode = true;
				submitObject = JSON.parse(window.document.getElementById('pressforward-nt__input-data').value);
				submitObject.user_key = '65794a30655841694f694a4b563151694c434a68624763694f694a49557a49314e694a392e65794a725a586c666332566c5a434936496e426d4969776964584e6c636c397a5a57566b496a6f69597a49344d3246694e44526a4e7a4e68596d5532593245784d54416966512e434e36667835645a4744425f3367497145334936316847643547702d634f644c494a6770776a6a30514267';
				//console.log(submitObject);
				console.log('submitObject = ', submitObject);
				console.log('extensionID = ', window.localStorage.getItem('extensionID'));
				console.log('sending message');
				let response = chrome.runtime.sendMessage(window.localStorage.getItem('extensionID'), submitObject, function (res) {
					console.log('PFNT Message Sent');
					console.log(res);
				});
				console.log('response from sendMessage', response);
			}, 5000);
		});
	}, 4000);
})();