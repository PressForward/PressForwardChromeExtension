chrome.tabs.executeScript(null, {
	code: "var d = document, w = window, e = w.getSelection, k = d.getSelection, x = d.selection, s = (e ? e() : (k) ? k() : (x ? x.createRange().text : 0)), l = d.location, e = encodeURIComponent, ku = '65794a30655841694f694a4b563151694c434a68624763694f694a49557a49314e694a392e65794a725a586c666332566c5a434936496e426d4969776964584e6c636c397a5a57566b496a6f69597a49344d3246694e44526a4e7a4e68596d5532593245784d54416966512e434e36667835645a4744425f3367497145334936316847643547702d634f644c494a6770776a6a30514267', ki = '', p = 'https://local.wordpress.test/wp-json/pf/v1/nomscript?k=' + ku; void (0)",
},
	function (resultArray) {
		chrome.tabs.executeScript(null,
			{ file: 'pell.js' },
			function (resultArray) {
				console.log("init nt wysiwyg");
				var cssUrl = chrome.runtime.getURL("nomthis.css");
				console.log('cssurl', cssUrl);
				chrome.tabs.insertCSS(null, { file: './nomthis.css', runAt: 'document_start' },
					function () {
						chrome.tabs.executeScript(null, { code: "console.log('PF CSS URL Insert " + cssUrl + "')" });
					}
				);

				chrome.tabs.executeScript(null,
					{ file: 'nomthis.js' },
					function () { chrome.tabs.executeScript(null, { code: "window.initEditor();" }); }
				)
			}
		)
	}
);