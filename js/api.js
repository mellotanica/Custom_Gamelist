function apiError(xhr, textStatus, error) {
	console.log("API Error: "+textStatus+" ("+error+")")
}

function apiGetRequest(url, callback, error) {
	if (error) {
		errFun = error;
	} else {
		errFun = apiError;
	}
	$.ajax(url, {
		type: "GET",
		dataType: "json",
		success: callback,
		error: errFun,
		crossDomain: true,
	});
}

function apiPostRequest(url, data, callback, error) {
	if (error) {
		errFun = error;
	} else {
		errFun = apiError;
	}
	$.ajax(url, {
		type: "POST",
		data: data,
		dataType: "json",
		success: callback,
		error: errFun,
		crossDomain: true,
	});
}

function apiNext(scraperAddr, prevGame, successCb, failCb) {
	if (successCb) {
		success = successCb;
	} else {
		success = function(result) {
			window.location.assign(result.link);
		};
	}
	if (failCb) {
		fail = failCb;
	} else {
		fail = function(result) {
			window.location.assign("http://store.steampowered.com/");
		};
	}
	if (prevGame) {
		var data = {
			gid: prevGame.gid,
			name: prevGame.name
		};
		apiPostRequest(scraperAddr+"/checkGet", data, success, fail);
	} else {
		apiGetRequest(scraperAddr+"/getItem", success, fail);
	}
}

function apiWishlist(scraperAddr, game) {
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

