import _ from 'lodash'
import lscache from 'lscache'
import Dict from '../translator/dict'
import Fanyi from '../translator/fanyi'
import { words } from 'lodash'

const PAT_WORD = /^([a-z]+-?)+$/i
const RESULT_FAILURE = {
  translation: '未找到释义',
  status: 'failure'
}

function isWord (text) {
  return text.match(PAT_WORD)
}

function smartText (text) {
  return isWord(text) ? words(text).join(' ') : text
}

function cacheResult(text, result) {
  const key = `text:v2:${_.trim(text)}`
  lscache.set(key, result, 60 * 24 * 7)
  return result
}

function translate (text) {
  const sourceText = smartText(text)

  if (!sourceText) {
    Promise.resolve(RESULT_FAILURE)
  } else if (isWord(sourceText)) {
    return Dict.translate(sourceText)
               .then(result => cacheResult(text, result))
               .catch(() => RESULT_FAILURE)
  } else {
    return Fanyi.translate(sourceText).catch(() => RESULT_FAILURE)
  }
}

export default { translate }
