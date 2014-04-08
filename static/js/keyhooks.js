// ------------------------------------
// Hook the windows keys
// ------------------------------------
// http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
var Key = {
  _pressed: {},

  SPACE: 32,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    //console.log(event.keyCode); // Logs the keycodes pressed.
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);