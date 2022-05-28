const BASE_URL = 'https://api.publicapis.org';

class Screen {
  constructor() {
    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.setCategory();
    this.setContent();
    this.initListeners();
  }

  get template() {
    return `
      <div class="container">
        <section class="dropdowns">
          ${this.getDropdown('category')}
          ${this.getDropdown('title')}
        </section>
        <section class="content"></section>
      </div>
    `;
  }

  getDropdown(type) {
    return `
     <div class="dropdown">
      <label for=${type}>Choose a ${type}:</label>
      <select name=${type} id="${type}" class="select"></select>
     </div>
    `
  }

  async setCategory() {
    const category = this.element.querySelector('#category');

    category.innerHTML = `<option>Loading...</option>`;

    const response = await this.request('/categories');
 
    category.innerHTML = ['', ...response.categories].map((category) => `
      <option>${category}</option>
    `).join('');
  }

  async setTitle(queryCategory) {
    const title = this.element.querySelector('#title');

    title.innerHTML = `<option>Loading...</option>`;

    const response = await this.request(`/entries?category=${queryCategory}`);

    title.innerHTML = [{API: ''}, ...response.entries].map((item) => `
      <option>${item.API}</option>
    `).join('');
  }

  async setContent(queryTitle = null) {
    const content = this.element.querySelector('.content');

    if (!queryTitle) {
      content.innerHTML = `<p>Nothing to display</p>`;
    } else {
      content.innerHTML = `<option>Loading...</option>`;

      const response = await this.request(`/entries?title=${queryTitle}`);

      const {
        API, Description, Category, Link,
      } = response.entries[0];

      content.innerHTML = `
        <h2>${API}</h2>
        <p>${Description}</p>
        <a href=${Link} target="_blank">link</>
      `;
    }
  }

  initListeners() {
    const category = this.element.querySelector('#category');
    const handleCategory = (e) => {
      const queryCategory = e.target.value.split(' ')[0];
      this.setTitle(queryCategory);
    };
    category.addEventListener('change', handleCategory);

    const title = this.element.querySelector('#title');
    const handleTitle = (e) => {
      this.setContent(e.target.value);
    };
    title.addEventListener('change', handleTitle);

    window.addEventListener('beforeunload', () => {
      category.removeEventListener('change', handleCategory);
      title.removeEventListener('change', handleTitle);
    }, { once: true });
  }

  async request(query) {
    try {
      const response = await fetch(`${BASE_URL}${query}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
          return res;
        });
      
      return response.json();
    } catch (err) {
      console.error(`Fetch problem: ${err}`)
    }
  }
}

export default Screen;
