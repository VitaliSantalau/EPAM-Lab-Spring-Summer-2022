class Entity {
  constructor(name) {
    this.name = name;
  }
}

class Stuff extends Entity {}

class Box extends Entity {
  stuff = [];

  addStuff(...stuff) {
    stuff.forEach((item) => this.stuff.push(item.name))
  }
}

class User extends Entity {
  setBox(box) {
    this.box = box;
  }
}

const pen = new Stuff('pen');
const pencil = new Stuff('pencil');
const ruler = new Stuff('ruler');
const rubber = new Stuff('rubber');
const book = new Stuff('book');
const notebook = new Stuff('notebook');

const schoolBox = new Box('school-box');
const schoolBag = new Box('school-bag');
const backpack = new Box('backpack');

const child1 = new User('Roma');
child1.setBox(schoolBox);
child1.box.addStuff(pen, pencil, ruler);

const child2 = new User('Daniil');
child2.setBox(schoolBag);
child2.box.addStuff(ruler, rubber, notebook);

const child3 = new User('Vasya');
child3.setBox(backpack);
child3.box.addStuff(notebook, book);

[child1, child2, child3].forEach((child) => {
  console.log(`
    ${child.name} has ${child.box.name} inside which is
      ${child.box.stuff.join(', ')}
  `)
})
