const PubSub = require('../helpers/pub_sub.js');
const MunroView = require('./munro_view.js');

const MunrosList = function (container) {
  this.container = container;
}

MunrosList.prototype.bindingEvents = function () {
  PubSub.subscribe('Munros:all-munros-ready', (evt) => {
    const munros = evt.detail;
    this.render(munros);
  });
};

MunrosList.prototype.render = function (munros) {
  munros.forEach((munro) => {
    const munroView = new MunroView(this.container, munro);
    munroView.render();
  })

};

module.exports = MunrosList;
