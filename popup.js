function submitNewNote(e){
    e.preventDefault(); //
    let newNote = e.target["0"].value;
    
    chrome.tabs.query(queryInfo, function(tabs) {
    
        var tab = tabs[0];
        var url = tab.url;

        if(url){
            
            chrome.storage.sync.get([url], function(result) {
                
                let first = result[url].slice(0,result[url].indexOf(tempText));
                let last = result[url].slice(result[url].indexOf(tempText)+1);
                result[url] = [...first, ...last];
                tempID = tempText.replace(/\W+/g, "")
                let id = '#' + tempID + 'note';
                $(id).hide();

                let background = chrome.extension.getBackgroundPage();
                background.deletedNote(result[url]);

                if(result[url].indexOf(newNote) < 0){
                    result[url].push(newNote);
                    let noteID = newNote.replace(/\W+/g, '')

                    $("#points ul").append('<li class="textback" id="' + noteID + 'note">' + newNote + ' <br> <button class="edit" id="' + newNote + '"> edit</button> <button class="delete" id="' + newNote + '">x </button>' + '</li>');
                }
                chrome.storage.sync.set(result, function() {});
            });
        }
    });
    $("#form").hide();
}