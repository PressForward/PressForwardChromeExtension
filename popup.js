console.log('Pressforward Nominate This');
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
	changeColor.style.backgroundColor = data.color;
	changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function (element) {
	let color = element.target.value;
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{ code: 'console.log("color switch"); document.body.style.backgroundColor = "' + color + '";' });
	});
};

document.addEventListener('DOMContentLoaded', function () {
	// return true;
	chrome.tabs.getSelected(null, function (tab) {



	});
}, false);
