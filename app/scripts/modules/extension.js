export const openExtensionPage = filename => {
  const url = chrome.runtime.getURL(filename)

  chrome.tabs.query({}, function(tabs) {
    var tab = tabs.find(tab => tab.url === url)

    if (tab) {
      chrome.tabs.reload(tab.id)
      chrome.tabs.update(tab.id, { highlighted: true })
    } else {
      chrome.tabs.create({ url: url })
    }
  })
}
