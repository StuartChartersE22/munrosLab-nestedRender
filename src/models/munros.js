const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request_helper.js');

const Munros = function () {
this.munros = null;
}

Munros.prototype.getData = function () {
  const request = new Request('https://munroapi.herokuapp.com/api/munros');
  console.dir(request);
  request.get()
  .then((data) => {
    this.munros = data;
    console.log(this.munros);
    PubSub.publish('Munros:all-munros-ready', this.munros);
  })
  .catch((err) => {
    console.error(err);
  })
};


module.exports = Munros;
