function loadPage(addr) {
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

chrome.browserAction.onClicked.addListener(function() {
	getScraperAddress(function(scraperAddr) {
		apiNext(scraperAddr, null, loadPage);
	});	
});
