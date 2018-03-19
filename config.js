function getScraperAddress(callback) {
	chrome.storage.sync.get(['scraper_address'], function(result) {
		callback(chrome.runtime.lastError ? null : result.scraper_address);
	});
}

function saveScraperAddress(address) {
	chrome.storage.sync.set({scraper_address: address});
}

function initExtension() {
	getScraperAddress(function(urlAddr) {
		if (urlAddr) {
			$("#address").val(urlAddr);
		} else {
			$("#address").val("http://localhost:8080");
		}
	});

	$("#apply").on("click", function(){
		saveScraperAddress($("#address").val());
		chrome.tabs.getCurrent(function(tab){
			chrome.tabs.remove(tab.id);
		});
	});
}

$(document).ready(function() {
	initExtension();
});
