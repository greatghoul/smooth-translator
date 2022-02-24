function selectionHandler(evt) {
  const text = strip(window.getSelection().toString())

  if (text) {
    chrome.runtime.sendMessage({ type: "selection", source: text, isWord: isWord(text) })
  }
}

document.addEventListener("mouseup", selectionHandler)
