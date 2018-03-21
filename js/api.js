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

function notFound(scraperAddr, game, loadPageFn) {
	var confText = "unable to load game: \""+game.name+"\" ("+game.gid+")\n"+
		"click Ok to manually serach the game,\n"+
		"Cancel to check next game";
	if(confirm(confText)){
		loadPageFn("http://store.steampowered.com/search/?term="+encodeURI(game.name));
	} else {
		apiDoubt(scraperAddr, game, loadPageFn);
	}
}

function apiCheckAndLoadPage(scraperAddr, game, loadPageFn){
	var fail = function() {
		notFound(scraperAddr, game, loadPageFn);
	};

	var xhr = new XMLHttpRequest();
	xhr.open("GET", game.link, true);
	xhr.onload = function() {
		if (xhr.status >= 200 && 
			xhr.status < 300 && 
			xhr.responseURL &&
			(
				xhr.responseURL == game.link || 
				xhr.responseURL.includes(game.gid)
			)
		) {
			loadPageFn(game.link);
			return;
		}
		console.log("unable to load url: "+game.link+"\ngot: "+xhr.responseURL);
		fail();
	}
	xhr.send();
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

