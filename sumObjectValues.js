const callbackfn = (acc, item) => {
  return (typeof item === 'number')
    ? acc + item : acc;
}

const initialValue = 0;

function sumObjectValuesFirst(obj) {
  return Array.prototype.reduce.apply(
    Object.values(obj), [callbackfn, initialValue],
  )
}

function sumObjectValuesSecond(obj) {
  return [].reduce.call(
    Object.values(obj), callbackfn, initialValue,
  )
}
