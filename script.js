const data = ['lark', 'parrot', 'eagle', 'crow', 'hawk', 'sparrow'];

const directions = {
  'asc': 1,
  'desc': -1,
};

class Table {
  direction = 'asc';

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
      <table>
        <caption>sortable table</caption>
        ${this.getHeader()}
        ${this.getBody()}
      </table>
    `;
  }

  getHeader() {
    return `
      <thead>
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
    return `
      ${this.direction === 'asc' ? '↑' : '↓'}
    `;
  }

  getBody() {
    return `
      <tbody>
        ${this.getRows()}    
      </tbody>
    `;
  }

  getRows() {
    return data.map((item) => this.getRow(item)).join('');
  }

  getRow(data) {
    return `
      <tr>
        <td>${data}</td>
      </tr>
    `;
  }
}

export default Table;