
function handleSubmit(submitObject, submitEndpoint) {
	window.pfnt.submitObject = submitObject;
	var urlEncodedData = "";
	var urlEncodedDataPairs = [];
	Object.keys(window.pfnt.submitObject).forEach((key) => {
		if (window.pfnt.submitObject[key]) {
			if ('string' === typeof window.pfnt.submitObject[key]) {
				var value = window.pfnt.submitObject[key].trim();
			} else {
				var value = window.pfnt.submitObject[key];
			}
			urlEncodedDataPairs.push(encodeURIComponent(key.trim()) + '=' + encodeURIComponent(value));
		}
	});
	urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
	var xhr = new XMLHttpRequest();
	xhr.open('POST', submitEndpoint, true);
	//xhr.setRequestHeader("Content-type", "application/json");
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.addEventListener('load', function (event) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var json = JSON.parse(xhr.responseText);
			console.log(json);
		} else {
			console.log(json);
			alert('Nomination failed');
		}
	});
	// var data = JSON.stringify(window.pfnt.submitObject);
	var data = urlEncodedData;
	xhr.send(data);
}

window.pfSiteData = {};
window.pfSiteData.site_url = "https://local.wordpress.test";
window.pfSiteData.plugin_url = "https://local.wordpress.test/wp-content/plugins/pressforward/";
window.pfSiteData.submit_endpoint = "https://local.wordpress.test/wp-json/pf/v1/submit-nomination";

chrome.runtime.onMessage.addListener(function (pfObject, sender, sendResponse) {
	console.log('received message', pfObject);
	if (pfObject.extensionMode) {
		delete pfObject.extensionMode;
		handleSubmit(pfObject, window.pfSiteData.submit_endpoint);
	}
	sendResponse({ pfntMessageListener: "complete" });
});

chrome.runtime.onMessageExternal.addListener(function (pfObject, sender, sendResponse) {
	console.log('received external message', pfObject);
	if (pfObject.extensionMode) {
		delete pfObject.extensionMode;
		handleSubmit(pfObject, window.pfSiteData.submit_endpoint);
	}
	sendResponse({ pfntExternalMessageListener: "complete" });
});
