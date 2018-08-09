const PubSub = require('../helpers/pub_sub.js');

const SelectedView = function (dropdown) {
  this.dropdown = dropdown;
}

SelectedView.prototype.bindingEvents = function () {
  PubSub.subscribe('Munros:all-regions-ready', (evt) => {
    const result = evt.detail;
    this.populate(result);
  });

  this.dropdown.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectedView:change-dropdown', selectedIndex);
  })
};

SelectedView.prototype.populate = function (allData) {
  allData.forEach((data, index) => {
    const option = document.createElement(`option`);
    option.textContent = data.name;
    option.value = index;
    this.dropdown.appendChild(option);
  })
};


module.exports = SelectedView;
