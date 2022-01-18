const PAT_WORD = /^[a-z]+('|'s)?$/i

function translate (text) {
  const sourceText = textStripe(text)
  const cacheKey = `text:v2:${sourceText}`
  const result = lscache.get(cacheKey)
  return result ? Promise.resolve(result) : translator.translate(sourceText)
}

function isWord(text) {
  return PAT_WORD.test(text)
}

dispatchMessage({
  translate (message, sender, sendResponse) {
    getSettings("settings", settings => {
      translate(message.text).then(result => {
        if (message.from === 'page') {
          result.timeout = options.notifyTimeout
        } else {
          window.localStorage.setItem('current', message.text)
        }

        sendResponse(result)
      })
    })
  }
)

//   selection (message, sender, sendResponse) {
//     window.localStorage.setItem('current', message.text)

//     if (isWord(message.text)) {
//       getActiveTab(tab => {
//         if (app.isSiteEnabled(tab.hostname)) {
//           chrome.tabs.sendMessage(sender.tab.id, {
//             type: 'translate',
//             text: message.text
//           })
//         }
//       })
//     }
//   },

//   current (message, sender, sendResponse) {
//     sendResponse(window.localStorage.getItem('current'))
//   },

//   linkInspect (message, sender, sendResponse) {
//     if (message.enabled) {
//       chrome.browserAction.setIcon({ path: 'images/icon-128-link.png' })
//     } else {
//       chrome.browserAction.setIcon({ path: 'images/icon-128.png' })
//     }
//   }
// })

// // Register command for quick link inspect switch
// chrome.commands.onCommand.addListener(command => {
//   if (command === 'toggle-link-inspect') {
//     getActiveTab(tab => chrome.tabs.sendMessage(tab.id, { type: 'toggleLink' }))
//   }
// })

// app.prepareOptions()
