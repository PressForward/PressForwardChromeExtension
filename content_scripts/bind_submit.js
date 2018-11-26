(function() {
	/**
	 * Check and set a global guard variable.
	 * If this content script is injected into the same page again,
	 * it will do nothing next time.
	 */
	console.log('bind_submit.js');
	window.setTimeout(function(){
		console.log('timeout completed, binding');
		document.querySelector("#pressforward-nt__button-container button#submit-button").addEventListener("click", (e) => {
		//document.addEventListener("click", (e) => {
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
			console.log('submitObject = ', submitObject);
			console.log('extensionID = ', window.localStorage.getItem('extensionID'));
			console.log('sending message');
			let response = chrome.runtime.sendMessage(window.localStorage.getItem('extensionID'), submitObject, function (res) {
				console.log('PFNT Message Sent');
				console.log(res);
			});
			console.log('response from sendMessage', response);
		});
	}, 4000);
})();