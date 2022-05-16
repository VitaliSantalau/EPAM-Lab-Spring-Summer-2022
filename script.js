const direct = {
  'asc': 1,
  'desc': -1,
};

class Table {
  data = ['lark', 'parrot', 'eagle', 'crow', 'hawk', 'sparrow'];
  direction = null;

  constructor() {
    this.render();
    this.initListeners();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  get template() {
    return `
      <table>
        <caption>sortable table</caption>
        ${this.getHeader()}
        ${this.getBody()}
      </table>
    `;
  }

  getHeader() {
    return `
      <thead class="header">
        <tr>
          <th>
            Bird
            ${this.getArrow()}  
          </th>
        </tr>
      </thead>
    `;
  }

  getArrow() {
    if (this.direction) {
      return `
        ${this.direction === 'asc' ? '↑' : '↓'}
      `;
    } else return ``;
  }

  getBody() {
    return `
      <tbody class="body">
        ${this.getRows()}    
      </tbody>
    `;
  }

  getRows() {
    let data = this.data;
    if (this.direction) {
      data = [...data].sort((a, b) => direct[this.direction] * (a <= b ? -1 : 1))
    }
    return data.map((item, i) => this.getRow(item, i)).join('');
  }

  getRow(item, i) {
    return `
      <tr>
        <td contenteditable id="${i}">${item}</td>
      </tr>
    `;
  }

  initListeners() {
    this.element.querySelector('.header')
      .addEventListener('pointerdown', () => {
        this.setDirection();
        this.update();
    });

    this.element.querySelector('.body')
      .addEventListener('input', (e) => {
        this.data[e.target.id] = e.target.textContent;
      })
  }

  setDirection() {
    switch (this.direction) {
      case 'asc':
        this.direction = 'desc';
        break;
      case 'desc': 
        this.direction = null;
        break;
      default:
        this.direction = 'asc';
    }
  }

  update() {
    this.element.querySelector('.header').innerHTML = this.getHeader();
    this.element.querySelector('.body').innerHTML = this.getBody();
  }
}

export default Table;
