// Prototypes and classes
class Animal {
  #energy = 10;                     // truly private field
  static count = 0;
  constructor(name) { this.name = name; Animal.count++; }
  eat() { this.#energy++; return this; }
  get energy() { return this.#energy; }
  toString() { return `${this.constructor.name}(${this.name})`; }
}
class Dog extends Animal {
  bark() { return `${this.name}: woof`; }
  eat() { super.eat(); return super.eat(); }   // dogs eat twice
}
const rex = new Dog("Rex");
console.log(rex.bark(), "| energy after eat():", rex.eat().energy, "| count:", Animal.count, "|", `${rex}`);
console.log("rex.#energy from outside?", (() => { try { return eval("rex.#energy"); } catch (e) { return e.name; } })());

console.log("--- the prototype chain");
console.log(Object.getPrototypeOf(rex) === Dog.prototype, Object.getPrototypeOf(Dog.prototype) === Animal.prototype,
  Object.getPrototypeOf(Animal.prototype) === Object.prototype, Object.getPrototypeOf(Object.prototype));
console.log("rex has own 'bark'?", Object.hasOwn(rex, "bark"), "| 'bark' in rex?", "bark" in rex, "| own keys:", Object.keys(rex));
console.log("rex instanceof Animal:", rex instanceof Animal, "| typeof Dog:", typeof Dog);

const proto = { hello() { return `hello from ${this.name}`; } };
const plain = Object.create(proto);
plain.name = "plain object";
console.log(plain.hello());

Dog.prototype.fetch = function () { return `${this.name} fetches`; };   // added later, all dogs get it
console.log(rex.fetch());

try { Dog("Bello"); } catch (e) { console.log(`${e.name}: ${e.message}`); }
