/**
* Debug Sprite class
* Author: @jelofsson
*
* prints the outlines of a sprite for debugging purposes
**/
DebugSprite = function(stage) {
    this.graphics = new PIXI.Graphics();
    stage.addChild(this.graphics);
}

DebugSprite.prototype.update = function(sprite)
{
    rectangle = sprite.getBounds();
    this.graphics.clear();
    this.graphics.lineStyle(1, 0xFF0000, 1);
    this.graphics.moveTo( rectangle.x , rectangle.y );
    this.graphics.lineTo( rectangle.x+rectangle.width , rectangle.y );
    this.graphics.lineTo( rectangle.x+rectangle.width , rectangle.y+rectangle.height );
    this.graphics.lineTo( rectangle.x  , rectangle.y+rectangle.height );
    this.graphics.lineTo( rectangle.x , rectangle.y );
}
