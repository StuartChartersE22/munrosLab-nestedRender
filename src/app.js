const Munros = require('./models/munros.js');
const MunrosList = require('./views/munros_list.js');
const SelectedView = require('./views/selected_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const container = document.querySelector(`.munros-list`);
  const munrosList = new MunrosList(container);
  munrosList.bindingEvents();

  const dropdown = document.querySelector(`.region-dropdown`);
  const selectedView = new SelectedView(dropdown);
  selectedView.bindingEvents();


  const munros = new Munros();
  munros.getData();

})
