class Screen {
  constructor() {
    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  get template() {
    return `
      <div class="container">
        <div>HI iiiiii</div>
      </div>
    `;
  }
}

export default Screen;