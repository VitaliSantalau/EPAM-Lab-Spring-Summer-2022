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
    this.setContent(null);
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

    try {
      const response = await this.request('/categories');
 
      category.innerHTML = ['', ...response.categories].map((category) => `
        <option>${category}</option>
      `).join('');  
    } catch (error) {
      console.error(`Could not set category, because: ${error}`);
    }    
  }

  async setTitle(queryCategory = '') {
    const title = this.element.querySelector('#title');
  
    if (queryCategory) {
      title.innerHTML = `<option>Loading...</option>`;

      try {
        const response = await this.request(`/entries?category=${queryCategory}`);
  
        title.innerHTML = [{API: ''}, ...response.entries].map((item) => `
          <option>${item.API}</option>
        `).join('');  
      } catch (error) {
        console.error(`Could not set title, because: ${error}`);
      }

    } else {
      title.innerHTML = '';
    }
  }

  async setContent(queryTitle) {
    const content = this.element.querySelector('.content');

    if (!queryTitle) {
      content.innerHTML = `<p>Nothing to display</p>`;
    } else {
      content.innerHTML = `<option>Loading...</option>`;

      try {
        const response = await this.request(`/entries?title=${queryTitle}`);

        const {
          API, Description, Category, Link,
        } = response.entries[0];
  
        content.innerHTML = `
          <h2>${API}</h2>
          <p>${Description}</p>
          <a href=${Link} target="_blank">link</>
        `;  
      } catch (error) {
        console.error(`Could not set content, because: ${error}`);
      }
    }
  }

  initListeners() {
    const category = this.element.querySelector('#category');
    const handleCategory = (e) => {
      const queryCategory = e.target.value.split(' ')[0];
      
      if (!queryCategory) {
        this.setContent(null);
      }
  
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
    return fetch(`${BASE_URL}${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response;
      })
      .then((response) => response.json())
      .catch((error) => console.error(`Fetch problem: ${error}`))
  }
}

export default Screen;
