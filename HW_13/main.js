function Cat(name, breed) {
  this.name = name;
  this.breed = breed;

  this.meow = function() {
    alert('Мяу!');
  }
}

function User(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastname = lastName;
  this.age = age;

  this.greet = function() {
    alert(`Привет, ${this.firstName}`);
  }
}