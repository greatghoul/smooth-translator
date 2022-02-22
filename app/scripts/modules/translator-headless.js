let translator = null;

function initTranslator () {
  if (translator) return translator

  let container = document.querySelector(".crx-smooth-translator")
  if (!container) {
    container = document.createElement("div")
    container.className = "crx-smooth-translator"
    document.body.appendChild(container)
  }

  translator = new TranslatorHeadless()
  translator.render(container)
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Reiceived message: ", JSON.stringify(message))
  if (message.type === "translate-selection") {
    initTranslator()
    translator.translate(message.source)
  }

  return true
})
