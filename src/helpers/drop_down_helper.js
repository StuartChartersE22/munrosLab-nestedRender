const DropDownHelper = {

  createOptions: function(selectTagObject, options, displayAttribute, identifier=null) {
    if(identifier === null){
      options.forEach((option, index) => {
        const selector = document.createElement(`option`);
        selector.textContent = option[displayAttribute];
        selector.value = index;
        selectTagObject.appendChild(selector);
      });
    }else {
      options.forEach(option => {
        const selector = document.createElement(`option`);
        selector.textContent = option[displayAttribute];
        selector.value = option[identifier];
        selectTagObject.appendChild(selector);
      });
    }
  },

  selectOption: function (options, searchValue, parameter=null) {
    if(parameter === null){
      return options[searchValue];
    }else {
      return options.find(option => option[parameter] === searchValue);
    }
  }

};

module.exports = DropDownHelper;
