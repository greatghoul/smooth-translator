const getTranslation = dom => {
  const selector = [
    ".dict-book .simple .basic .word-exp",
    ".dict-book .simple .transList",
    ".dict-book .fanyi .trans-content"
  ].join(",")
  const targets = dom.querySelectorAll(selector)
  return Array.from(targets).map(x => `<p>${x.textContent}</p>`).join("")
}

const getPhonetic = dom => {
  const selector = ".simple-explain .word-head .per-phone .phonetic"
  const targets = dom.querySelectorAll(selector)
  return Array.from(targets).map(x => {
    const spans = x.parentNode.querySelectorAll("span")
    return Array.from(spans).map(y => y.textContent).join(" ")
  }).join("\n")
}

export const parseDictResult = (source, html) => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(html, "text/html")
  const translation = getTranslation(dom)
  const phonetic = getPhonetic(dom)

  if (translation) {
    return { source, phonetic, translation, status: "success" }
  } else {
    return { source, phonetic, translation: "未找到翻译结果", status: "failure" }
  }  
}
