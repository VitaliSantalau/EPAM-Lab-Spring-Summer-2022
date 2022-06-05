import Store from "../store.js";

class Form {
  constructor() {
    this.store = new Store();
    this.create();
  }

  create() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.initFormListeners();
  }

  get template() {
    return `
      <form >
        <input name="name" type="text" placeholder="type your name here" />
        <div class="container-btn">
          <input type="submit" value="Submit" />
          <input type="button" name="cancel" value="Cancel"/>
        </div>
      </form>
    `;
  }

  initFormListeners() {
    this.element.onsubmit = (e) => {
      e.preventDefault();

      this.store.set('name', e.target.name.value);
      this.close();

      this.header.update();
    };

    this.element.cancel.onclick = () => {
      this.close();
    }
  }

  showCover() {
    const cover = document.createElement('div');
    cover.classList = 'cover';

    document.body.append(cover);
  }

  hideCover() {
    document.querySelector('.cover').remove();
  }

  open() {
    this.showCover();
    root.append(this.element);
  }

  close() {
    this.hideCover();
    this.element.remove();
  }

  getHeader(header) {
    this.header = header;
  }
}

const form = new Form();

export default form;
