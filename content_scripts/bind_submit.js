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
				// Perhaps encode this plus date with the private key to make sure that the window the plugin added is what is sending the data?
				submitObject.user_key = '65794a30655841694f694a4b563151694c434a68624763694f694a49557a49314e694a392e65794a725a586c666332566c5a434936496e426d4969776964584e6c636c397a5a57566b496a6f694e6d46694e7a497a4e44466c4f5455305a57526d5a545a694e5751794d694a392e2d62536d32446c4a507741326a6a526f6b365f66525261566f41575566367a306d3943315751644b395a63';
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