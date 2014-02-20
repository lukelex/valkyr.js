(function(){
  Function.prototype.method = function(name, func){
    if (!this.hasOwnProperty(name)) {
      this.prototype[name] = func;
      return this;
    }
  }

  Function.method("inherits", function (Parent) {
    this.prototype = Object.create(Parent.prototype);
    return this;
  });
})();
