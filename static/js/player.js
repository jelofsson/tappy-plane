/**
* Player class
* Author: @jelofsson
*
* use to make a moving game character in pixi.
**/
PIXI.Player = function(stage, textures) {
    // Call the parent constructor
    PIXI.Character.call(this, stage, textures);
    this.max_py = 480;
    this.min_py = 0;
    this.jumping = false;
    this.jumping_allowed = false;
    this.jumping_y = 0;
    this.jumping_max_y = 70;
}

// constructor
PIXI.Player.constructor = PIXI.Player;
PIXI.Player.prototype = Object.create( PIXI.Character.prototype );

PIXI.Player.prototype.moveUp = function() {
    if(this.dy > -6) {
        this.dy -= 2;
    }
    if(this.rotation > -0.2) {
        this.rotation -= 0.02;
    }
}

PIXI.Player.prototype.moveDown = function() {
    if(this.dy < 6) {
        this.dy += 0.28;
    }
    if(this.rotation < 0) {
        this.rotation += 0.02;
    }
}

PIXI.Player.prototype.update = function()
{
    
    if ((Key.isDown(Key.SPACE) && this.jumping_allowed) || this.jumping) {
        this.jumping_allowed = false;
        if(this.jumping_y < this.jumping_max_y) {
            this.moveUp();
            this.jumping_y += -this.dy;
            this.jumping = true;
        } else {
            this.jumping = false;
            this.jumping_y = 0;
        }
    } else {
        this.moveDown();
    }
    
    if( ! Key.isDown(Key.SPACE)) {
        this.jumping_allowed = true;
    }
    
    // center the sprites anchor point
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    // move the sprite to correct position
    this.position.x = this.position.x + this.dx;
    if((this.position.y+this.dy) > this.min_py && (this.position.y+this.dy) < this.max_py) {
        this.position.y = this.position.y + this.dy;
    }
    
    //this.dx = 0;
    //this.dy = 0;
    // !! DO NOT EDIT !! INHERIT FROM MovieClip
    PIXI.MovieClip.prototype.updateTransform.call(this);
    // !! DO NOT EDIT !! INHERIT FROM MovieClip
    
}