const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request_helper.js');

const Munros = function () {
this.munros = null;
}

Munros.prototype.bindingEvents = function () {
  this.getData();
  PubSub.subscribe('SelectedView:change-dropdown', (evt) => {
    const selectedIndex = evt.detail;
    if(selectedIndex === `all`){
      PubSub.publish('Munros:munros-ready', this.munros);
    }else {
      const selectedRegion = this.munrosByRegions[selectedIndex];
      PubSub.publish('Munros:munros-ready', selectedRegion.munros);
    };
  })
};

Munros.prototype.getData = function () {
  const request = new Request('https://munroapi.herokuapp.com/api/munros');
  request.get()
  .then((data) => {
    this.munros = data;
    PubSub.publish('Munros:munros-ready', this.munros);
    this.getAllRegions();
  })
  .catch((err) => {
    console.error(err);
  })
};

Munros.prototype.getAllRegions = function () {

  const regions = getRegions(this.munros);
  this.munrosByRegions = filterToRegions(regions, this.munros);
  PubSub.publish('Munros:all-regions-ready', this.munrosByRegions);
};

function getRegions(munros) {
  const regions = [];
  return munros.reduce((regions, munro) => {
    if(!regions.includes(munro.region)){
      regions.push(munro.region);
    }
    return regions;
  }, []);
}


function filterToRegions(regions, munros) {
  return regions.map(region => {
    return {
      name: region,
      munros: munrosByRegion(region, munros)

    }
  });
}

function munrosByRegion(region, munros) {
  return munros.filter(munro => munro.region === region);
}

module.exports = Munros;
