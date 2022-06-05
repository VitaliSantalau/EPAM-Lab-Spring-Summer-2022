import form from "./form.js";

import Store from "../store.js";

class Header {
  constructor() {
    this.store = new Store();
    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.initListeners();
    this.setToggle();
    this.setTheme(this.store.get('theme') || 'light');
  }

  get template() {
    return `
      <header>
        <div class="container">
          <div class="user">
            ${this.getUserName()}
            <button class="user-btn">change name</button>      
          </div>
          ${this.getToggle()}
        </div>  
      </header>
    `;
  }

  getUserName() {
    return `
      <div class="user-name">
        ${this.store.get('name') || 'unknown user'}
      </div>
    `;
  }

  updateUserName() {
    this.element.querySelector('.user-name')
      .innerHTML = this.getUserName();
  }

  getToggle() {
    return `
      <div class="themes">
        <input class="theme" type="radio" id="light" name="theme" value="light" />
        <label class="label-light" for="light">light</label>
        <input class="theme" type="radio" id="dark" name="theme" value="dark" />
        <label class="label-dark" for="dark">dark</label>
      </div>
    `;
  }

  setToggle() {
    this.element.querySelectorAll('.theme').forEach((item) => {
      item.value === (this.store.get('theme') || 'light')
        ? item.checked = true
        : item.checked = false;
    });
  }

  setTheme(theme) {
    const r = document.querySelector(':root');
    
    if (theme === 'light') {
      r.style.setProperty('--color-bg', 'bisque');
      r.style.setProperty('--color-form-bg', '#fabe75');
      r.style.setProperty('--color-text', '#000000');
    }

    if (theme === 'dark') {
      r.style.setProperty('--color-bg', '#492a04');
      r.style.setProperty('--color-form-bg', '#633e11');
      r.style.setProperty('--color-text', '#ffffff');
    }
  }

  initListeners() {
    const userBtn = this.element.querySelector('.user-btn');
    const handleUserBtn = () => {
      form.open();
    };
    userBtn.addEventListener('pointerdown', handleUserBtn);

    const themes = this.element.querySelector('.themes');
    const handleChangeTheme = (e) => {
      const theme = e.target.value;

      this.setTheme(theme);
      this.store.set('theme', theme)
    };
    themes.addEventListener('change', handleChangeTheme);

    window.addEventListener('beforeunload', () => {
      userBtn.removeEventListener('pointerdown', handleUserBtn);   
      themes.removeEventListener('change', handleChangeTheme);   
    }, { once: true });
  }
}

export default Header;
