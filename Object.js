/*
Comprehensive guide: JavaScript Objects

Save and run with: node Object.js

This file contains examples and concise notes covering most common
concepts related to objects in JavaScript.
*/

// 1) Creating objects

// Object literal (most common)
const person = {
  firstName: "Alice",
  lastName: "Smith",
  age: 30,
  // method
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

// Constructor function (pre-ES6 style)
function Car(make, model) {
  this.make = make;
  this.model = model;
}
Car.prototype.info = function () {
  return `${this.make} ${this.model}`;
};

const car = new Car("Toyota", "Corolla");

// Object.create - set prototype explicitly
const proto = {
  greet() {
    return "hello";
  },
};
const objFromProto = Object.create(proto);

// ES6 class syntax (syntactic sugar over prototype)
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a noise`;
  }
}
class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}

// 2) Accessing properties
// dot vs bracket
person.firstName; // dot
person["lastName"]; // bracket (useful for dynamic keys)

const key = "age";
person[key]; // dynamic access

// 3) Adding, changing, deleting properties
person.city = "New York"; // add
person.age = 31; // update
delete person.city; // remove

// 4) Property descriptors and Object.defineProperty
const obj = {};
Object.defineProperty(obj, "x", {
  value: 42,
  writable: false,
  enumerable: false,
  configurable: false,
});

// getters and setters
const user = {
  first: "Jo",
  last: "Doe",
  get full() {
    return `${this.first} ${this.last}`;
  },
  set full(name) {
    const [f, l] = name.split(" ");
    this.first = f;
    this.last = l;
  },
};

// 5) Object iteration
// - for...in (enumerable properties, including prototype chain)
// - Object.keys / values / entries (own enumerable properties only)

for (const k in person) {
  // will also enumerate inherited enumerable properties
}

Object.keys(person).forEach((k) => {});
Object.values(person).forEach((v) => {});
Object.entries(person).forEach(([k, v]) => {});

// 6) Copies and immutability
// Shallow copy
const copy = Object.assign({}, person);
const spread = { ...person };

// Deep clone (simple cases) using JSON (loses functions, Dates, undefined, Symbols)
const deep = JSON.parse(JSON.stringify(person));

// Modern deep clone (Node 17+/browsers): structuredClone
// const deep2 = structuredClone(person);

// Freeze / seal / preventExtensions
const frozen = Object.freeze({ a: 1 });
const sealed = Object.seal({ b: 2 });
const prevented = Object.preventExtensions({ c: 3 });

// 7) Prototype chain & inheritance
function Parent() {
  this.p = "parent";
}
Parent.prototype.say = function () {
  return "hi";
};
function Child() {
  Parent.call(this);
  this.c = "child";
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
const child = new Child();
// child instanceof Child => true
// child instanceof Parent => true

// Inspect prototype
Object.getPrototypeOf(child);

// 8) Useful Object APIs
// Object.getOwnPropertyDescriptor, getOwnPropertyNames, hasOwnProperty
Object.getOwnPropertyDescriptor(person, "firstName");
Object.getOwnPropertyNames(person);
person.hasOwnProperty("firstName");

// 9) Symbols as keys (non-enumerable by default in some operations)
const sym = Symbol("id");
const withSymbol = { [sym]: 123, visible: true };
Object.getOwnPropertySymbols(withSymbol);

// 10) JSON conversion
const json = JSON.stringify(person);
const fromJson = JSON.parse(json);

// 11) Practical patterns
// Factory
function makePoint(x, y) {
  return {
    x,
    y,
    move(dx, dy) {
      this.x += dx;
      this.y += dy;
    },
  };
}

// Mixin (copy methods onto a prototype)
const canEat = {
  eat() {
    return `${this.name} eats`;
  },
};
Object.assign(Animal.prototype, canEat);

// 12) Performance & memory notes (brief)
// - Prefer object literals and class syntax for readability.
// - Avoid large dynamic objects with many hidden class shapes in performance-critical code.

// 13) Examples and console output
console.log("person:", person);
console.log("person.fullName():", person.fullName());
console.log("car.info():", car.info());
console.log("objFromProto.greet():", objFromProto.greet());
console.log("dog speak:", new Dog("Rex").speak());
console.log("descriptor of obj.x:", Object.getOwnPropertyDescriptor(obj, "x"));
console.log("user.full getter:", user.full);
user.full = "Jane Roe";
console.log("user after setter:", user.first, user.last);
console.log("Object.keys(person):", Object.keys(person));
console.log("copy shallow equals person?", copy.firstName === person.firstName);
console.log("frozen isFrozen?", Object.isFrozen(frozen));
console.log("symbols:", Object.getOwnPropertySymbols(withSymbol));

// Export for interactive use (if required)
if (typeof module !== "undefined")
  module.exports = {
    person,
    Car,
    car,
    objFromProto,
    Animal,
    Dog,
    obj,
    user,
  };

/*
Quick reference (short):
- Create: {} | new Constructor() | Object.create(proto) | class
- Access: .prop | ['prop']
- Iterate: Object.keys / values / entries, for...in
- Copy: Object.assign / {...} (shallow), structuredClone / JSON (deep)
- Descriptor: Object.defineProperty, getOwnPropertyDescriptor
- Inheritance: prototype chain, instanceof
- Freeze/seal: Object.freeze / Object.seal / Object.preventExtensions
*/
