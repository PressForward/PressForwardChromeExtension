function setValueToStorage(key, value) {
	// Set into storage

	chrome.storage.local.set({ key: '' }, function () {
		console.log("The color is green.");
	});
}

var getSettingsInfo = function (button) {
	let self = {};
	self.button = button;
	let response = chrome.runtime.sendMessage('{extension: "active", settings_mode: true}', (res) => {
		var pfntSiteData = JSON.parse(document.getElementById('pfnt__pfSiteData').value);
		console.log('PFNT Setting Prep', pfntSiteData, document);
		pfntSiteData.settings_mode = true;
		let response = chrome.runtime.sendMessage(pfntSiteData, function (res) {
			console.log('PFNT Message Sent');
			console.log(res);
		});
		console.log('response from sendMessage', response);
		chrome.storage.local.set(pfntSiteData, () => {
			console.log("System variables set for PFNT");
			if (self.button) {
				console.log('button', self.button);
				var button = document.getElementById("pressforward-nt__" + self.button);
				button.style.backgroundColor = 'lightgreen';
				button.innerHTML = 'API Keys Saved';
			}
		});
		console.log(res);
	});

};
console.log('PFNT Settings Population Prep');


console.log('PFNT Settings Population Hooking');
setTimeout(getSettingsInfo, 10000);

console.log('PFNT bind_populate_settings.js');
window.setTimeout(function () {
	console.log('PFNT timeout completed, binding');
	var setupButton = document.getElementById("pressforward-nt__setup-button")
	if (setupButton) {
		setupButton.addEventListener("click", (e) => {
			//document.addEventListener("click", (e) => {
			getSettingsInfo('setup-button');

		});
	}
	var regenButton = document.getElementById("pressforward-nt__regenerate-button")
	if (regenButton) {
		regenButton.addEventListener("click", (e) => {
			//document.addEventListener("click", (e) => {
			window.setTimeout(function () {
				getSettingsInfo('regenerate-button');
			}, 1000);
		});
	}
}, 1000);

