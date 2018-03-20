function initExtension() {
	getScraperAddress(function(urlAddr) {
		$("#address").val(urlAddr);
	});

	getNextShortcut(function(key) {
		$("#shrt-next").val(key);
	});

	getWishlistShortcut(function(key) {
		$("#shrt-wish").val(key);
	});

	$("#apply").on("click", function(){
		saveScraperAddress($("#address").val());
		saveNextShortcut($("#shrt-next").val());
		saveWishlistShortcut($("#shrt-wish").val());
		chrome.tabs.getCurrent(function(tab){
			chrome.tabs.remove(tab.id);
		});
	});
}

$(document).ready(function() {
	initExtension();
});
