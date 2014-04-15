/**
* Character class
* Author: @jelofsson
*
* use to make a moving game character in pixi.
**/
PIXI.Character = function(stage, textures) {
    
    // Call the parent constructor
    PIXI.MovieClip.call(this, textures);
    
    this.x          = 0;
    this.y          = 0;
    
    this.dx         = 0; // direction-x (how many pixels are we moving in x-axis)
    this.dy         = 0; // direction-y (how many pixels are we moving in y-axis)
    
    this.maxdx      = 10; // the max-speed we can move in x-axis
    this.maxdy      = 10; // the max-speed we can move in y-axis
    this.weight     = 10; // the weight of our character
    this.jumping    = false; // are we in-air right now?
    
    this.texturesArray   = { // Array of pixi textures
        'run_right': null,
        'run_left': null,
        'jump': null,
        'duck': null
    };
    
    this.textures = null;
    
    this.animationSpeed = 1;
    this.loop = true;
    this.onComplete = null;
    this.currentFrame = 0;
    this.playing = false;
    
    stage.addChild(this);
}

// constructor
PIXI.Character.constructor = PIXI.Character;
PIXI.Character.prototype = Object.create( PIXI.MovieClip.prototype );

PIXI.Character.prototype.setTextures = function(type, textures) { 
    this.texturesArray[type] = textures;
}

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.Character.prototype.update = function()
{
  
    // center the sprites anchor point
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    // move the sprite to correct position
    this.position.x = this.position.x + this.dx;
    this.position.y = this.position.y + this.dy;
    
    this.dx = 0;
    this.dy = 0;
    
    // ----------------------------------------------------
    // !! DO NOT EDIT !! INHERIT FROM MovieClip
    // This code is copied from the MovieClip function:
    PIXI.Sprite.prototype.updateTransform.call(this);

    if(!this.playing)return;

    this.currentFrame += this.animationSpeed;

    var round = (this.currentFrame + 0.5) | 0;

    if(this.loop || round < this.textures.length)
    {
        this.setTexture(this.textures[round % this.textures.length]);
    }
    else if(round >= this.textures.length)
    {
        this.gotoAndStop(this.textures.length - 1);
        if(this.onComplete)
        {
            this.onComplete();
        }
    }
    // !! DO NOT EDIT !! INHERIT FROM MovieClip
}

/*
Character.prototype.getSprite = function() {
    if(this.sprite = null) {
        this.sprite = new PIXI.Sprite(this.textureArray[0]); // create a new Sprite
    }
    return this.sprite;
}
*/