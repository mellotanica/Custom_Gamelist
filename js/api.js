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

function apiCheckAndLoadPage(scraperAddr, game, loadPageFn){
	var notFound = function() {
		alert("unable to load game: "+game.name+" ("+game.gid+")\nchecking next game");
		apiDoubt(scraperAddr, game, loadPageFn);
	};

	$.ajax(game.link, {
		type: "GET",
		crossDomain: true,
		success: function(data, statusText, hdr) {
			if(hdr.status < 200 || hdr.status >= 300){
				notFound();
			} else {
				loadPageFn(game.link);
			}
		},
		error: notFound,
		statusCode: {
			302: notFound
		}
	});
}

function apiSendAndLoad(scraperAddr, game, endpoint, loadPageFn) {
	if (!loadPageFn) {
		loadPageFn = function(addr) {
			window.location.assign(addr);
		};
	}
	var success = function(result) {
		apiCheckAndLoadPage(scraperAddr, result, loadPageFn);
	};
	var fail = function() {
		loadPageFn("http://store.steampowered.com/");
	};
	if (game) {
		var data = {
			gid: game.gid,
			name: game.name
		};
		apiPostRequest(scraperAddr+"/"+endpoint, data, success, fail);
	} else {
		apiGetRequest(scraperAddr+"/getItem", success, fail);
	}
}

function apiDoubt(scraperAddr, game, loadPageFn) {
	apiSendAndLoad(scraperAddr, game, "doubt", loadPageFn);
}

function apiNext(scraperAddr, game, loadPageFn) {
	apiSendAndLoad(scraperAddr, game, "checkGet", loadPageFn);
}

