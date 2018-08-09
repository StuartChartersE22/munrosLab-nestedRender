const PubSub = require('../helpers/pub_sub.js');
const DropDownHelper = require('../helpers/drop_down_helper.js');

const SelectedView = function (dropdown) {
  this.dropdown = dropdown;
}

SelectedView.prototype.bindingEvents = function () {
  PubSub.subscribe('Munros:all-regions-ready', (evt) => {
    const result = evt.detail;
    DropDownHelper.createOptions(this.dropdown, result, `name`, `name`);
  });

  this.dropdown.addEventListener('change', (evt) => {
    const selectedName = evt.target.value;
    PubSub.publish('SelectedView:change-dropdown', selectedName);
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
