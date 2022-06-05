class Store {
  get(item) {
    return localStorage.getItem(item);
  }

  set(item, value) {
    localStorage.setItem(item, value)
  }
}

export default Store;
