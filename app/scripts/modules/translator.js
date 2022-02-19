const RESULT_FAILURE = {
  translation: '未找到释义',
  status: 'failure'
}

const buildURL = text => {
  return `https://dict.youdao.com/w/eng/${encodeURIComponent(text)}/#keyfrom=dict2.index`
}

export function translate (text) {
  return new Promise((resolve, reject) => {
    if (!text) {
      reject(RESULT_FAILURE)
    } else {
      const url = buildURL(text)
      return fetch(url, {
        credentials: "include",
        cache: "force-cache",
        redirect: "follow",
        referrer: url,
      }).then(resp => resp.text()).then(text => console.log(text)).then(() => resolve(RESULT_FAILURE))
    }
  })
}
