import cookie from 'cookie'

export function setCookie (cname, cvalue) {
  document.cookie = cookie.serialize(cname, cvalue)
}

export function getCookie (cname) {
  const cookies = cookie.parse(document.cookie)
  return cookies[cname] || ''
}
