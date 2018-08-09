const PubSub = require('../helpers/pub_sub.js');

const SelectedView = function (list) {
  this.list = list;
}

SelectedView.prototype.bindingEvents = function () {
  PubSub.subscribe('Munros:all-regions-ready', (evt) => {
    const result = evt.detail;
    this.populate(result);
  });
};

SelectedView.prototype.populate = function (allData) {
  allData.forEach((data, index) => {
    const option = document.createElement(`option`);
    option.textContent = data.name;
    option.value = index;
    this.list.appendChild(option);
  })
};


module.exports = SelectedView;
