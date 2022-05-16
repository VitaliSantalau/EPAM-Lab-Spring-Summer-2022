const direct = {
  'asc': 1,
  'desc': -1,
};

class Table {
  direction = null;

  constructor(data) {
    this.data = data;
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
      data = [...data].sort((a, b) => {
        return direct[this.direction] * (a.bird <= b.bird ? -1 : 1);
      })
    }
    return data.map((item) => this.getRow(item)).join('');
  }

  getRow(item) {
    return `
      <tr>
        <td contenteditable id="${item.id}">
          ${item.bird}
        </td>
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
        this.data
          .find((item) => item.id === e.target.id)
          .bird = e.target.textContent.trim();
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
