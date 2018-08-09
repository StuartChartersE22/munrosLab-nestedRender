const Munros = require('./models/munros.js');
const MunrosList = require('./views/munros_list.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const container = document.querySelector(`.munros-list`);
  const munrosList = new MunrosList(container);
  munrosList.bindingEvents();


  const munros = new Munros();
  munros.getData();

})
