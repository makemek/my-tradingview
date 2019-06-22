export function getSignatureInfo(signature) {
  const matches = /^~m~(\d+?)~m~/.exec(signature)
  if (!matches) {
    return {
      text: null,
      length: null,
    }
  }

  return {
    text: matches.input,
    length: parseInt(matches[1], 10),
  }
}
