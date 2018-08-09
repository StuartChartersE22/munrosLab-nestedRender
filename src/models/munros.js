const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request_helper.js');
const DropDownHelper = require('../helpers/drop_down_helper.js');

const Munros = function () {
this.munros = null;
this.munrosByRegions = null;
}

Munros.prototype.bindingEvents = function () {
  this.getData();
  PubSub.subscribe('SelectedView:change-dropdown', (evt) => {
    const selectedName = evt.detail;
    if(selectedName === `all`){
      PubSub.publish('Munros:munros-ready', this.munros);
    }else {
      console.log(selectedName);
      const selectedRegion = DropDownHelper.selectOption(this.munrosByRegions, selectedName, `name`);
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
