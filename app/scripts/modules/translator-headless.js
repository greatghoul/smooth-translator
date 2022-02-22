let translator = null;

function initTranslator () {
  if (translator) return translator

  let container = document.querySelector("#crx-smooth-translator")
  if (!container) {
    container = document.createElement("div")
    container.id = "crx-smooth-translator"
    container.style = "all: initial;"
    document.body.appendChild(container)
  }

  translator = new TranslatorHeadless()
  translator.render(container)
}

// function toggleLink (message, sender, sendResponse) {
//   toggleLinkInspectMode()
// }

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Reiceived message: ", JSON.stringify(message))
  if (message.type === "translate-selection") {
    initTranslator()
    translator.translate(message.source)
  }

  return true
})
