function attachNewSubmit() {
	window.pfntSubmit = function (publish) {
		console.log('Submitting to PressForward');
		window.pfnt.submitObject.post_title = window.document.getElementById('pressforward-nt__inputfield__title').value;
		window.pfnt.submitObject.item_author = window.document.getElementById('pressforward-nt__inputfield__byline').value;
		window.pfnt.submitObject.content = window.document.getElementById('nominateText').innerHTML;
		window.pfnt.submitObject.item_feat_img = window.pfMetaData.image;
		window.pfnt.submitObject.post_tags = window.document.querySelector('#pressforward-nt__preview-tags-container input').value;
		if (publish) {
			window.pfnt.submitObject.publish = 'Last Step';
			window.pfnt.submitObject.post_status = 'publish';
		}
		window.pfnt.submitObject.extensionMode = true;
		console.log('submitObject = ', window.pfnt.submitObject);
		console.log('extensionID = ', window.localStorage.getItem('extensionID'));
		var response = chrome.runtime.sendMessage(window.localStorage.getItem('extensionID'), window.pfnt.submitObject, null, function () { console.log('PFNT Message Sent'); });
		console.log('response from sendMessage', response);
	};
}
attachNewSubmit();
console.log('Window.pfntSubmit = ', window.pfntSubmit);
// window.localStorage.setItem('pfnt', 'test');