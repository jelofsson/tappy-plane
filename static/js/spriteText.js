/**
* Debug Sprite class
* Author: @jelofsson
*
* prints the outlines of a sprite for debugging purposes
**/
SpriteText = function(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
}

SpriteText.prototype.render = function(sprite)
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

SpriteText.prototype.setText = function(text) { this.text = text; }
SpriteText.prototype.setX = function(units) { this.x = units; }
SpriteText.prototype.setY = function(units) { this.y = units; }