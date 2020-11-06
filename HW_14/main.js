let arr = ['Apple', 'Banana', 'Pineapple'];

arr.push('Orange', 'Grapes');

arr = arr.map(elem => elem === 'Banana' ? 'Peer': elem); // arr[1] = 'Peer'

const lasItem = arr.pop();
console.log(lasItem);

arr.unshift('Watermelon');