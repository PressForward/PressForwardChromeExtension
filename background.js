chrome.runtime.onInstalled.addListener(function () {
	// Set into storage
	chrome.storage.local.set({ color: '#3aa757' }, function () {
		console.log("The color is green.");
	});

});