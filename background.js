chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        (async () => {
            const response = await fetch('https://www.enchantedlearning.com/wordlist/computer.shtml', {
                //mode: 'cors'
            });
            const text = await response.text();
            var matches = text.match(/<div\s+class=wordlist-item>[\S\s]*?<\/div>/gi);
            var words = [];
            for (var i = 0; i < matches.length; i++) {
                const tmpWord = matches[i].replace(/(<\/?[^>]+>)/gi, '');
                if (tmpWord.length <= 30) {
                    words.push(tmpWord);
                }
            }
            words = words.join();
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action", "words": words});
        })()
    });
});