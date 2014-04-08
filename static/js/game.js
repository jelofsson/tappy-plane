/**
* Game class
* Author: @jelofsson
**/
function Game(element) {
    
    // ------------------------------------
    // Variables
    // ------------------------------------
    this.SCROLL_SPEED   = 8;
    this.WIDTH          = 826;
    this.HEIGHT         = 464; //window.innerHeight;
    this.RUNNING        = false;
    // ------------------------------------
    // Pixi.js instance setup
    // ------------------------------------
    // create an new instance of a pixi stage
    this.stage = new PIXI.Stage(0x000000);
    // create a renderer instance.
    this.renderer = PIXI.autoDetectRenderer(this.WIDTH, this.HEIGHT);
    // add the renderer view element to the DOM
    element.appendChild(this.renderer.view);

    // ------------------------------------
    // Main runtime objects setup
    // ------------------------------------
    // init scroller:
    this.scroller = new Scroller_tappy(this.stage, this.WIDTH, this.HEIGHT);
    // init Tappy plane:
    var textures = []; textures.push(PIXI.Texture.fromImage("resources/planeBlue1.png") );
    this.player = new PIXI.Player(this.stage, textures);
    this.player.position.x          = this.WIDTH-((this.WIDTH/4)*3);
    this.player.position.y          = this.HEIGHT/2;
    // init overlay
    this.overlay = new PIXI.Graphics();
    this.stage.addChild(this.overlay);
    this.intro = new PIXI.Text("", {font: "bold 60px Arvo", fill: "#ffffff", align: "center", stroke: "#ffd014", strokeThickness: 7});
    this.stage.addChild(this.intro);
    // init point
    this.points = new PIXI.Text("", {font: "bold 60px Arvo", fill: "#ffffff", align: "center", stroke: "#ffd014", strokeThickness: 7});
    this.points.position.x = (this.WIDTH/2)-25;
    this.points.position.y = 25;
    this.stage.addChild(this.points);
    
    this.reset();
    requestAnimFrame(this.update.bind(this));
}

Game.prototype.reset = function() {
    this.RUNNING = false;
    this.overlay.beginFill(0x9ecee0);
    this.overlay.fillAlpha = 0.5;
    this.overlay.drawRect(0,0,this.WIDTH, this.HEIGHT);
    this.intro.setText("Press space to start!");
    this.intro.position.x = 145;
    this.intro.position.y = (this.HEIGHT/2)-40;
}

Game.prototype.start = function() {
    this.RUNNING = true;
    this.scroller.reset();
    this.overlay.clear();
    this.intro.setText("");
}

Game.prototype.update = function() {
    // Update player and map
    if(this.RUNNING) {
        this.overlay.fillAlpha = 0; // remove overlay
        this.points.setText(this.scroller.pointsTaken(this.player));
        this.player.update();
        this.scroller.moveViewportXBy(this.SCROLL_SPEED);
        // Check for crash
        if( this.scroller.didPlayerCrash(this.player) ) {
            this.reset();
        }
    } else if (Key.isDown(Key.SPACE)) {
            this.start();
    }
    
    // Render next frame
    this.renderer.render(this.stage);  
    requestAnimFrame(this.update.bind(this));
};
