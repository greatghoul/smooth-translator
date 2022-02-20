import _ from 'lodash'
import $ from 'jquery'

export function openExtensionPage(filename) {
  var optionsUrl = chrome.extension.getURL(filename)

  chrome.tabs.query({}, function(tabs) {
    var optionTab = _.find(tabs, { url: optionsUrl })

    if (optionTab) {
      chrome.tabs.reload(optionTab.id)
      chrome.tabs.update(optionTab.id, { highlighted: true })
    } else {
      chrome.tabs.create({ url: optionsUrl })
    }
  })
}

export function renderTranslation(query, result) {
  let phonetic = ''
  let translation = '未找到释义'
  let className = 'cst-warning'

  if (result) {
    phonetic = result.phonetic
    translation = result.translation
    className = 'cst-success'
  }

  return `
    <div class="cst-result ${className}">
      <h6>${query}</h6>
      <code>${phonetic || ''}</code>
      <pre>${translation}</pre>
    </div>
  `
}

export function stopPropagation(event) {
  event.stopPropagation()
}

// TODO: Move toggleLinkInspectMode function to a proper place
export function toggleLinkInspectMode (flag) {
  $('body').toggleClass('cst-link-inspect-mode', flag)
  const enabled = $('body').is('.cst-link-inspect-mode')
  chrome.runtime.sendMessage({ type: 'linkInspect', enabled })
}