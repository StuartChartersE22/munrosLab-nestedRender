const MunroView = function (container, munro) {
  this.container = container;
  this.munro = munro;
}

MunroView.prototype.render = function () {
  addMunroName(this.munro.name, this.container);
  addListOfDetails(this.munro, this.container);

};

function addMunroName(name, container) {
  const munroName = document.createElement(`h3`);
  munroName.classList.add(`munro-name`);
  munroName.textContent = name;
  container.appendChild(munroName);
}

function addListOfDetails(munro, container) {
  const list = document.createElement(`ul`);
  addNameMeaning(munro.meaning, list);
  addHeight(munro.height, list);
  container.appendChild(list);
}


function addNameMeaning (meaning, list) {
  const munroMeaning = document.createElement(`li`);
  munroMeaning.textContent = `Meaning: ` + meaning;
  list.appendChild(munroMeaning);
}

function addHeight(height, list) {
  const munroHeight = document.createElement(`li`);
  munroHeight.textContent = `Height: ` + height;
  list.appendChild(munroHeight);
}

module.exports = MunroView;
