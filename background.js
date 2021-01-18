const WORD_ITEM_PATTERN = /<div\s+class=wordlist-item>[\S\s]*?<\/div>/gi;
const REMOVE_TAG_PATTERN = /(<\/?[^>]+>)/gi;
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        (async () => {
            const response = await fetch('https://www.enchantedlearning.com/wordlist/computer.shtml');
            const text = await response.text();
            const words = text
                            .match(WORD_ITEM_PATTERN)
                            .map(tag => tag.replace(REMOVE_TAG_PATTERN, ''))
                            .join();
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
                "message": "clicked_browser_action",
                "words": words
            });
        })()
    });
});
