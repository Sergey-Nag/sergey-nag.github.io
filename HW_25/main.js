// №1
String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

// №2
Array.prototype._sort = Array.prototype.sort;
Array.prototype.sort = function (arg) {
  return [...this]._sort(arg);
};

// №3
NodeList.prototype.map = Array.prototype.map;
NodeList.prototype.reduce = Array.prototype.reduce;
NodeList.prototype.find = Array.prototype.find;

// *
function immutableArray() {}

immutableArray.prototype = {
  slice: Array.prorotype.slice,
  concat: Array.prorotype.concat,
  filter: Array.prorotype.filter,
  forEach: Array.prorotype.forEach,
  map: Array.prorotype.map,
  reduce: Array.prorotype.reduce,
  pop: function() {
    return Array.prototype.pop.call([...this]);
  },
  push: function(arg) {
    return Array.prototype.push.call([...this], arg);
  },
  shift: function() {
    return Array.prototype.shift.call([...this]);
  },
  unshift: function(arg) {
    return Array.prototype.unshift.call([...this], arg);
  },
  splice: function(...args) {
    return Array.prototype.splice.call([...this], ...args);
  },
  sort: function(arg) {
    return Array.prototype.sort.call([...this], arg);
  },
  reverse: function() {
    return Array.prototype.reverse.call([...this]);
  }
}
