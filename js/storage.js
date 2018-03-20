function getScraperAddress(callback) {
	chrome.storage.sync.get(['scraper_address'], function(result) {
		callback(chrome.runtime.lastError ||
			! result.scraper_address ?
			'http://localhost:8080' : result.scraper_address);
	});
}

function saveScraperAddress(address) {
	chrome.storage.sync.set({scraper_address: address});
}

function getNextShortcut(callback) {
	chrome.storage.sync.get(['next_shortcut'], function(result) {
		callback(chrome.runtime.lastError || 
			! result.next_shortcut ? 
			'n' : result.next_shortcut);
	});
}

function saveNextShortcut(shortcut) {
	chrome.storage.sync.set({next_shortcut: shortcut});
}

function getWishlistShortcut(callback) {
	chrome.storage.sync.get(['wishlist_shortcut'], function(result) {
		callback(chrome.runtime.lastError || 
			! result.wishlist_shortcut ?
			'w' : result.wishlist_shortcut);
	});
}

function saveWishlistShortcut(shortcut) {
	chrome.storage.sync.set({wishlist_shortcut: shortcut});
}

