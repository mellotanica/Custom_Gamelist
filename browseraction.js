function change_page(addr) {
	chrome.tabs.query(
		{ currentWindow: true, active : true },
		function(tabArray){
			chrome.tabs.update(tabArray[0].id, {
				url: addr
			});
		}
	);
	window.location.assign(addr);
}

function success(result) {
	change_page(result.link);
}

function fail() {
	change_page("http://store.steampowered.com/");
}

chrome.browserAction.onClicked.addListener(function() {
	getScraperAddress(function(scraperAddr) {
		apiNext(scraperAddr, null, success, fail);
	});	
});
