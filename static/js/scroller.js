function Scroller(stage, width, height) {
    
    this.width = width;
    this.height = height;
    console.log(this.width);

    this.far = new Far(width, height);
    stage.addChild(this.far);
    this.mid = new Mid(width, 71);
    stage.addChild(this.mid);
    
    this.viewportX = 0;
}
Scroller.prototype.setViewportX = function(viewportX) {
    this.viewportX = viewportX;
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
};
Scroller.prototype.moveViewportXBy = function(units) {
  var newViewportX = this.viewportX + units;
  this.setViewportX(newViewportX);
};
Scroller.prototype.getViewportX = function() {
  return this.viewportX;
};
// -------------------------------------
// Far layer
// -------------------------------------
function Far(width, height) {
  var texture = PIXI.Texture.fromImage("resources/background.png");
  PIXI.TilingSprite.call(this, texture, width, height);

  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;

  this.viewportX = 0;
}
Far.constructor = Far;
Far.prototype = Object.create(PIXI.TilingSprite.prototype);
Far.DELTA_X = 0.128;
Far.prototype.setViewportX = function(newViewportX) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
};
// -------------------------------------
// Mid layer
// -------------------------------------
function Mid(width, height) {
  var texture = PIXI.Texture.fromImage("resources/groundGrass.png");
  PIXI.TilingSprite.call(this, texture, width, height);

  this.position.x = 0;
  this.position.y = 409;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
    this.viewportX = 0;
}
Mid.constructor = Mid;
Mid.prototype = Object.create(PIXI.TilingSprite.prototype);
Mid.DELTA_X = 0.64;
Mid.prototype.setViewportX = function(newViewportX) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
};