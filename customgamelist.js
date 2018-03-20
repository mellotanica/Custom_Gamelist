function get_appid(t) {
	if (t && t.match(/(?:store\.steampowered|steamcommunity)\.com\/(sub|bundle|app|market\/listings)\/(\d+)\/?/)) return RegExp.$1+"/"+RegExp.$2;
	else return null;
}

function get_gameinfo(scraperAddr, appid, callback) {
	var data = {
		gid: appid
	};
	apiPostRequest(scraperAddr+"/getItem", data, function(result) {
		callback(scraperAddr, result);
	});
}

function addToWishlist(scraperAddr, game) {
	if($("#add_to_wishlist_area").length > 0) {
		$("#add_to_wishlist_area").attrchange({
			trackValues: false,
			callback: function (e) {
				if (e.attributeName == "style") {
					apiNext(scraperAddr, game);
				}
			}
		});
		$("#add_to_wishlist_area > a")[0].click();
	} else {
		window.location.assign("https://store.steampowered.com/login/?redir="+game.gid);
	}
}

function instrumentPage(scraperAddr, gameinfo) {
	var html = "<div class='review_buttons_area'><a class='btnv6_blue_hoverfade btn_medium review_button left' id='review_button_wishlist'><span>Wishlist</span></a><a class='btnv6_blue_hoverfade btn_medium review_button right' id='review_button_next' align='right'><span>Next</span></a></div>";
	$("body").append(html);
	$("#review_button_next").on("click", function() {
		apiNext(scraperAddr, gameinfo);
	});
	$("#review_button_wishlist").on("click", function() {
		addToWishlist(scraperAddr, gameinfo);
	});
	getNextShortcut(function(shortcut) {
		$(document).on('keydown', null, shortcut, function() {
			$("#review_button_next").click();
		});
	});
	getWishlistShortcut(function(shortcut) {
		$(document).on('keydown', null, shortcut, function() {
			$("#review_button_wishlist").click();
		});
	});
}

$(document).ready(function() {
	getScraperAddress(function(scraperAddr) {
		var path = window.location.pathname.replace(/\/+/g, "/");
		switch(true) {
			case /^\/app\/.*/.test(path):
			case /^\/sub\/.*/.test(path):
			case /^\/bundle\/.*/.test(path):
				get_gameinfo(
					scraperAddr, 
					get_appid(window.location.host + path),
					instrumentPage
				);
				break;
		}
	});
});
