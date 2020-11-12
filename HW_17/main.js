function random(min, max) {
  const randomFloat = min + Math.random() * (max + 1 - min);
  return Math.floor(randomFloat);
}
