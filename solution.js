function premutation(str) {
  if (str.length <= 2) {
    return str.length === 2
      ? [str[0]+str[1], str[1] + str[0]]
      : [str]
  }
  return str
    .split('')
    .reduce((acc, char, i) => acc.concat(
        premutation(str.slice(0, i) + str.slice(i + 1)).map((val) => char + val)
      ), [])
}

function print(str) {
  return  Array.from(
    new Set(premutation(str))
  )
  .sort()
  .join(', '); 
}
