const MunroView = function (container, munro) {
  this.container = container;
  this.munro = munro;
}

MunroView.prototype.render = function () {
  addMunroName(this.munro.name, this.container);
  // addNameMeaning(this.munro.meaning, this.container);
  // addHeight(this.munro.height, this.container);
};

function addMunroName(name, container) {
  const munroName = document.createElement(`h2`);
  munroName.classList.add(`munro-name`);
  munroName.textContent = name;
  container.appendChild(munroName);
}

module.exports = MunroView;
