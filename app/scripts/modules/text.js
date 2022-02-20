export const isWord = text => {
  return /^[a-z]+$/img.test(text)
}

export const strip = text => {
  return (text || "").replace(/(^\s+|\s+$)/, "")
}
