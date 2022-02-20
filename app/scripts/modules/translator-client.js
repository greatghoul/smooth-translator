export const translate = text => {
  const url = `https://www.youdao.com/result?word=${encodeURIComponent(text)}&lang=en`
  return fetch(url, {
    credentials: "include",
    cache: "force-cache",
    redirect: "follow",
    referrer: url,
  }).then(resp => resp.text())
}
