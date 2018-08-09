const Munros = require('./models/munros.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const munros = new Munros();
  munros.getData();
})
