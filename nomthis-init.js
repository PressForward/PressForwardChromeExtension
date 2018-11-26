function attachScriptFirst(scriptName) {
	var stringBlock = "var s = document.createElement('script'); \
	s.src = '"+ chrome.extension.getURL(scriptName + '.js') + "'; \
	(document.head || document.documentElement).prepend(s);";
	console.log(stringBlock);
	return stringBlock;
}

function attachScriptLast(scriptName) {
	var stringBlock = "var s = document.createElement('script'); \
	s.id = 'pfnt-script-"+ scriptName + "'; \
	s.src = '"+ chrome.extension.getURL(scriptName + '.js') + "'; \
	(document.head || document.documentElement).appendChild(s);";
	console.log(stringBlock);
	return stringBlock;
}

chrome.browserAction.onClicked.addListener(function () {

	chrome.tabs.executeScript(null, {
		code: "var d = document, w = window, e = w.getSelection, k = d.getSelection, x = d.selection, s = (e ? e() : (k) ? k() : (x ? x.createRange().text : 0)), l = d.location, e = encodeURIComponent, ku = '65794a30655841694f694a4b563151694c434a68624763694f694a49557a49314e694a392e65794a725a586c666332566c5a434936496e426d4969776964584e6c636c397a5a57566b496a6f69597a49344d3246694e44526a4e7a4e68596d5532593245784d54416966512e434e36667835645a4744425f3367497145334936316847643547702d634f644c494a6770776a6a30514267', ki = '', p = 'https://local.wordpress.test/wp-json/pf/v1/nomscript?k=' + ku; void (0)",
	},
		function (resultArray) {
			chrome.tabs.executeScript(null,
				{ code: attachScriptFirst('pell') },
				function (resultArray) {
					console.log("init nt wysiwyg");
					//var cssUrl = chrome.runtime.getURL("nomthis.css");
					//console.log('cssurl', cssUrl);
					var cssJs = ' \
				var link = document.createElement("link"); \
				link.href ="'+ 'a' + '"; \
				link.type = "text/css"; \
				link.rel = "stylesheet"; \
				link.media = "screen,print"; \
				document.getElementsByTagName("head")[0].appendChild(link);';
					chrome.tabs.executeScript(null, { file: 'nomthis.css.js' },
						function () {
							chrome.tabs.executeScript(null, { code: "console.log('PF CSS URL Insert')" });
						}
					);

					chrome.tabs.executeScript(null,
						{ code: attachScriptLast('nomthis') },
						function () {
							// chrome.tabs.executeScript(null, { code: "setTimeout( function(){ window.initEditor(); }, 2000);" });
							chrome.tabs.executeScript(null,
								{ code: attachScriptLast('submit') },
								function () { chrome.tabs.executeScript(null, { code: "window.localStorage.setItem('extensionID', '" + chrome.runtime.id + "');" }); }
							)
						}
					)
					// window.pfnt.

				}
			)
		}
	);
	window.pfSiteData = {};
	window.pfSiteData.site_url = "https://local.wordpress.test";
	window.pfSiteData.plugin_url = "https://local.wordpress.test/wp-content/plugins/pressforward/";
	window.pfSiteData.submit_endpoint = "https://local.wordpress.test/wp-json/pf/v1/submit-nomination";

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

	chrome.tabs.executeScript({file: "/content_scripts/bind_submit.js"})
});
//,"default_popup": "popup.html"