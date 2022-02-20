// import { toggleLinkInspectMode } from '../helpers/utils'
function selectionHandler(evt) {
  // toggleLinkInspectMode(false)

  const text = strip(window.getSelection().toString())

  if (text) {
    chrome.runtime.sendMessage({ type: 'selection', source: text, isWord: isWord(text) })
  }
}

document.addEventListener('mouseup', selectionHandler)
