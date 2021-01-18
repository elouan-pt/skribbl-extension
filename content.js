chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.message === "clicked_browser_action") {
        var customWordsBox = document.getElementById('lobbySetCustomWords')
        if (customWordsBox !== null) {
            customWordsBox.value = request.words
        }
      }
    }
  );