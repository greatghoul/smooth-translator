const isWord = text => {
  return /^[a-z]+$/img.test(text)
}

const strip = text => {
  return (text || "").replace(/(^\s+|\s+$)/, "")
}
