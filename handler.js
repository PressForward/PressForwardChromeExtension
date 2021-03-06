window.pfnt = {};

function handleSubmit(submitObject, submitEndpoint) {
	window.pfnt.submitObject = submitObject;
	var urlEncodedData = "";
	var urlEncodedDataPairs = [];
	console.log('Object to submit', submitObject);
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

function retrieveSettings(key) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get([key], function (result) {
			console.log(key + ' Value currently is ', result);
			resolve(result[key]);
		});
	});
}

async function populateWindow() {
	window.pfSiteData = {};
	window.pfSiteData.site_url = await retrieveSettings('site_url');
	window.pfSiteData.plugin_url = await retrieveSettings('plugin_url');
	window.pfSiteData.submit_endpoint = await retrieveSettings('submit_endpoint');
	window.pfSiteData.categories_endpoint = await retrieveSettings('categories_endpoint');
}

populateWindow();

chrome.runtime.onMessage.addListener(function (pfObject, sender, sendResponse) {
	console.log('received message', pfObject);
	if (pfObject.extensionMode) {
		delete pfObject.extensionMode;
		handleSubmit(pfObject, window.pfSiteData.submit_endpoint);
		sendResponse({ pfntMessageListener: "complete" });
	}
});

chrome.runtime.onMessageExternal.addListener(function (pfObject, sender, sendResponse) {
	console.log('received external message', pfObject);
	if (pfObject.extensionMode) {
		delete pfObject.extensionMode;
		handleSubmit(pfObject, window.pfSiteData.submit_endpoint);
	}
	sendResponse({ pfntExternalMessageListener: "complete" });
});


chrome.runtime.onMessage.addListener(function (pfObject, sender, sendResponse) {
	console.log('received message', pfObject);
	if (pfObject.settings_mode) {
		delete pfObject.settings_mode;
		chrome.storage.local.set(pfObject, () => { });
		sendResponse({ pfntMessageListener: "complete" });
	}
});