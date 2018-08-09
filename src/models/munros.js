const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request_helper.js');

const Munros = function () {
this.munros = null;
}

Munros.prototype.getData = function () {
  const request = new Request('https://munroapi.herokuapp.com/api/munros');
  request.get()
  .then((data) => {
    this.munros = data;
    PubSub.publish('Munros:all-munros-ready', this.munros);
    this.getAllRegions();
  })
  .catch((err) => {
    console.error(err);
  })
};

Munros.prototype.getAllRegions = function () {

  const regions = getRegions(this.munros);
  const munrosByRegions = filterToRegions(regions, this.munros);
  PubSub.publish('Munros:all-regions-ready', munrosByRegions);
  console.dir(munrosByRegions);
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
