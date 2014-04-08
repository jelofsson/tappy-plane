Scroller_tappy = function(stage, canvas_w, canvas_h) {
    // Call the parent constructor
    Scroller.call(this, stage, canvas_w, canvas_h);
    this.stage = stage; // Store so we can send obstacles to it
    this.canvas_w = canvas_w;
    this.canvas_h = canvas_h;
    this.points_taken = 0;
    
    // Init obstacles array
    this.obstacles = [];
    this.obstacles_deltax = 0.64;
}
Scroller_tappy.constructor = Scroller_tappy; // constructor
Scroller_tappy.prototype = Scroller; // parent
Scroller_tappy.prototype.setViewportX = Scroller.prototype.setViewportX;

Scroller_tappy.prototype.moveViewportXBy = function(units) {
    Scroller.prototype.moveViewportXBy.call(this, units);
    
    // Handle obstacles events:
    if(this.obstacles.length > 0) {
        for(var i=0; i < this.obstacles.length; i++) {
            this.obstacles[i].moveXBy( units * this.obstacles_deltax ); // Move obstacle
        }
    }
    // Check if new obstacle should be created
    if(this.obstacles.length == 0 || (
        this.obstacles[this.obstacles.length-1].x < this.canvas_w/2
    ))
    {
        var obstacle = new Obstacle(this.stage, this.canvas_w, this.canvas_h);
        this.obstacles.push(obstacle);
    }
}

Scroller_tappy.prototype.didPlayerCrash = function(player) {
    if(this.obstacles.length == 0) {
        return false;
    }
    for(var i=0; i < this.obstacles.length; i++) {
        // Front of plane
        if((player.position.x+(player.width/2) >= this.obstacles[i].leftX() && player.position.x+(player.width/2) <= this.obstacles[i].rightX()) && 
            (player.position.y <= this.obstacles[i].topY() || player.position.y >= this.obstacles[i].bottomY() )) {
            return true;
        }
        // Top of plane
        else if((player.position.x <= this.obstacles[i].leftX() && player.position.x+(player.width/2) >= this.obstacles[i].rightX()) && 
            player.position.y-((player.height/2)-7) <= this.obstacles[i].topY()) {
            return true; 
        }
        // Bottom of plane
        else if((player.position.x <= this.obstacles[i].leftX() && player.position.x+(player.width/2) >= this.obstacles[i].rightX()) && 
            player.position.y+(player.height/2) >= this.obstacles[i].bottomY()) {
            return true;
        }
        // Top of plane
        /*
        else if((player.position.x-(player.width/2) <= this.obstacles[i].leftX() && player.position.x+(player.width/2) >= this.obstacles[i].rightX()) && 
            player.position.y-((player.height/2)-7) <= this.obstacles[i].topY()) {
            return true; 
        }
        // Bottom of plane
        else if((player.position.x-(player.width/2) <= this.obstacles[i].leftX() && player.position.x+(player.width/2) >= this.obstacles[i].rightX()) && 
            player.position.y+(player.height/2) >= this.obstacles[i].bottomY()) {
            return true;
        }
        */
    }
    return false;
}

Scroller_tappy.prototype.pointsTaken = function(player) {
    if( this.obstacles.length > 0 && player.position.x-(player.width) >= this.obstacles[this.points_taken].leftX()) {
        this.points_taken += 1;
    }
    return this.points_taken;
}

Scroller_tappy.prototype.reset = function() {
    this.points_taken = 0;
    for(var i=0; i<this.obstacles.length; i++) {
        this.stage.removeChild(this.obstacles[i].bSprite);
        this.stage.removeChild(this.obstacles[i].tSprite);
    }
    this.obstacles = [];
}

function Obstacle(stage, canvas_w, canvas_h) {
    this.obstacleHeight = 393;
    this.obstacleWidth = 108;
    this.hsize = Math.random() * (180 - 220) + 220;
    this.hpos = Math.random() * (10 - (canvas_h-(this.hsize+100)) ) + (canvas_h-(this.hsize+100));
    this.x = canvas_w;        
    this.tSprite = new PIXI.Sprite( PIXI.Texture.fromImage("resources/rockDown.png") );
    this.tSprite.position.y = this.hpos - this.obstacleHeight;
    this.tSprite.position.x = canvas_w;
    this.bSprite = new PIXI.Sprite( PIXI.Texture.fromImage("resources/rock.png") );
    this.bSprite.position.x = canvas_w;
    this.bSprite.position.y = this.hpos + this.hsize;
    stage.addChildAt(this.tSprite,2);
    stage.addChildAt(this.bSprite,2);
}

Obstacle.prototype.leftX = function () {
    return this.x + 60;
}

Obstacle.prototype.rightX = function () {
    return this.x + 70;
}

Obstacle.prototype.topY = function () {
    return this.hpos;
}
Obstacle.prototype.bottomY = function () {
    return this.hpos+this.hsize;
}

Obstacle.prototype.moveXBy = function(units){
    this.tSprite.position.x -= units;
    this.bSprite.position.x -= units;
    this.x -= units;
}