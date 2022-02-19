const RESULT_FAILURE = {
  translation: '未找到释义',
  status: 'failure'
}

const buildURL = text => {
  return `https://dict.youdao.com/w/eng/${encodeURIComponent(text)}/#keyfrom=dict2.index`
}

const isWord = text => {
  return /^[a-z]+$/img.test(text)
}

const translateWord = text => {
  const url = buildURL(text)
  return fetch(url, {
    credentials: "include",
    cache: "force-cache",
    redirect: "follow",
    referrer: url,
  }).then(resp => {
    return resp.text()
  }).then(text => {
    console.log(text)
  })
}

const translatePhase = text => {

}

export function translate (text) {
  return new Promise((resolve, reject) => {
    if (!text) {
      reject(RESULT_FAILURE)
    } else if (isWord(text)) {
      translateWord(text).then(resolve).catch(reject)
    } else {
      translatePhase(text).then(resolve).catch(reject)
    }
  })
}
