var contextMenu = {
	"id": "quicknote",
	"title": "Quick Note",
    "contexts": ["selection"],
}
chrome.contextMenus.create(contextMenu);

chrome.contextMenus.onClicked.addListener(function(data){
	if(data.menuItemId == 'quicknote' && data.selectionText) {
		let url = data.pageUrl;
		let text = data.selectionText;
		if(text.length >= 10 && text.length <= 1000){
			chrome.storage.sync.get([url], function(result) {       
			result[url] = result[url] ? result[url] : []
			if(result[url].indexOf(text) < 0){
				result[url].push(text);
			}
			chrome.storage.sync.set(result, function() {});
			});
		}
	}
})

