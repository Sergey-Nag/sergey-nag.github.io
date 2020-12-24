class Vegetable {
  constructor(name) {
    this.name = name;
  }
}


class Animal {
  constructor(legs) {
    this.legs = legs;
    this.stomach = [];
  }

  eat(food) {
    this.stomach.push(food);
    console.log(`${food} eaten`);
  }
}


class Rabbit extends Animal {
  constructor(breed) {
    super(4);

    this.breed = breed;
  }

  eat(food) {
    if (!(food instanceof Vegetable)) throw new Error(`${food} is not a vegetable`);

    super.eat(food);
  }

  jump() {
    console.log("Rabbit has jumped");
  }
}


class Snake extends Animal {
  constructor(isPoisonous) {
    super(0);

    this.isPoisonous = isPoisonous;
  }

  eat(food) {
    if (!(food instanceof Rabbit)) throw new Error("Snake eats rabbits only!");

    super.eat(food);
  }

  crawl() {
    console.log("Snake is crawling");
  }
}


class Human extends Animal {
  constructor(firstName, lastName) {
    super(2);
    
    this.firstName = firstName;
    this.lastName = lastName;
  }

  eat(food) {
    if (food instanceof Human) throw new Error("Well Clarice, Have The Lambs Stopped Screaming?");

    super.eat(food);
  }

  walk() {
    console.log("Human is walking");
  }

  greet() {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}`);
  }
}