function add(...args) {
  return args.reduce((acc, obj) => {
    Object.entries(obj).forEach(
      ([key, value]) => {
        return acc[key]
          ? acc[key] += value
          : acc[key] = value
      }
    )
    return acc;
  }, {});
}


function intersect(first, ...rest) {
  return rest.reduce((acc, obj) => {
    return Object.fromEntries(
      Object.entries(acc).filter(
        ([key, value]) => {
          return (
            key in obj && value === obj[key]
          );
      })
    );
  }, first);
}
