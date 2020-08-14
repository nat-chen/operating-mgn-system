export default function () {
  let s = []
  let num10 = 0x10
  let num3 = 0x3
  let num8 = 0x8
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * num10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & num3) | num8, 1)
  s[8] = s[13] = s[18] = s[23] = ''

  return s.join('')
}