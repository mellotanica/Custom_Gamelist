function getScraperAddress(callback) {
	chrome.storage.sync.get(['scraper_address'], function(result) {
		callback(chrome.runtime.lastError ? null : result.scraper_address);
	});
}

function get_appid(t) {
	if (t && t.match(/(?:store\.steampowered|steamcommunity)\.com\/(app|market\/listings)\/(\d+)\/?/)) return RegExp.$1+"/"+RegExp.$2;
	else return null;
}

function get_subid(t) {
	if (t && t.match(/(?:store\.steampowered|steamcommunity)\.com\/(sub|bundle)\/(\d+)\/?/)) return RegExp.$1+"/"+RegExp.$2;
	else return null;
}

function apiError(xhr, textStatus, error) {
	alert(textStatus+": "+error);
}

function apiGetRequest(url, callback) {
	$.ajax(url, {
		type: "GET",
		success: callback,
		crossDomain: true,
	});
}

function apiPostRequest(url, data, callback) {
	$.ajax(url, {
		type: "POST",
		data: data,
		success: callback,
		crossDomain: true,
	});
}

function instrumentPage(gameinfo) {
	alert(gameinfo);
}

function get_gameinfo(scraperAddr, appid) {
	var data = {
		gid: appid
	};
	apiPostRequest(scraperAddr+"/getItem", data, function(result) {
		instrumentPage(result);
	});
}

$(document).ready(function() {
	getScraperAddress(function(address) {
		scraperAddr = address;
		var path = window.location.pathname.replace(/\/+/g, "/");
		switch(true) {
			case /^\/app\/.*/.test(path):
				get_gameinfo(scraperAddr, get_appid(window.location.host + path));
				break;
			case /^\/sub\/.*/.test(path):
			case /^\/bundle\/.*/.test(path):
				get_gameinfo(scraperAddr, get_subid(window.location.host + path));
				break;
		}
	});
});
