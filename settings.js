// https://developer.chrome.com/extensions/options#write_page
chrome.storage.local.get(['site_url'], function (result) {
	console.log('site_url Value currently is ' + result);
	document.getElementById('pfSiteData_site_url').value = result.site_url;
});
chrome.storage.local.get(['ku'], function (result) {
	console.log('ku Value currently is ' + result);
	document.getElementById('pfSiteData_ku').value = result.ku;
});
chrome.storage.local.get(['ki'], function (result) {
	console.log('ki Value currently is ' + result);
	document.getElementById('pfSiteData_ki').value = result.ki;
});
chrome.storage.local.get(['plugin_url'], function (result) {
	console.log('plugin_url Value currently is ' + result);
	document.getElementById('pfSiteData_plugin_url').value = result.plugin_url;
});
chrome.storage.local.get(['categories_endpoint'], function (result) {
	console.log('categories_endpoint Value currently is ' + result);
	document.getElementById('pfSiteData_categories_endpoint').value = result.categories_endpoint;
});
chrome.storage.local.get(['submit_endpoint'], function (result) {
	console.log('submit_endpoint Value currently is ' + result);
	document.getElementById('pfSiteData_submit_endpoint').value = result.submit_endpoint;
});
// window.pfSiteData = {};
// window.pfSiteData.site_url = "https://local.wordpress.test";
// window.pfSiteData.submit_endpoint = "https://local.wordpress.test/wp-json\/pf/v1/submit-nomination";
// window.pfSiteData.categories_endpoint = 'https://local.wordpress.test/wp-json/wp/v2/categories';
// window.pfSiteData.userkey = '65794a30655841694f694a4b563151694c434a68624763694f694a49557a49314e694a392e65794a725a586c666332566c5a434936496e426d4969776964584e6c636c397a5a57566b496a6f69597a49344d3246694e44526a4e7a4e68596d5532593245784d54416966512e434e36667835645a4744425f3367497145334936316847643547702d634f644c494a6770776a6a30514267';
