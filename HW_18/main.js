function capitalize(string) {
  return string.split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}


function checkSubstring(string, substring) {
  return string.toLowerCase()
    .includes(
      substring.toLowerCase()
    );
}