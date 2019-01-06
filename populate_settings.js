function setValueToStorage(key, value) {
	// Set into storage

	chrome.storage.local.set({ key: '' }, function () {
		console.log("The color is green.");
	});
}

var getSettingsInfo = function () {
	let response = chrome.runtime.sendMessage(window.localStorage.getItem('extensionID'), '{extension: "active", settings_mode: true}', function (res) {
		var pfntSiteData = JSON.parse(document.getElementById('pfnt__pfSiteData').value);
		console.log('PFNT Setting Prep', pfntSiteData, document);
		chrome.storage.local.set(pfntSiteData, function () {
			console.log("System variables set for PFNT");
		});
		console.log(res);
	});

};
console.log('Settings Population Prep');
setTimeout(getSettingsInfo, 10000);