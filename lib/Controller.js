var Board = require('./Board');

function Controller(dimension, initialStates) {
	if (!initialStates) {
		initialStates = '';
		for (var i = 0; i < dimension*dimension; i++) {
			initialStates = initialStates + String(Math.round(Math.random()));
		}
	}
  this.present = new Board(dimension, initialStates);
  this.printBoard();
}

Controller.prototype.tick = function () {
  var newBoard = new Board();

  for (var pos in this.present.grid) {
		positions = pos.split(',');
		var xPos = positions[0];
		var yPos = positions[1];

		var futureState = this.present.willPositionBeAlive(xPos, yPos);
		newBoard.setPositionState(xPos, yPos, futureState);
  }

  this.present = newBoard;
  this.printBoard();
};

Controller.prototype.printBoard = function() {
	var grid = this.present.grid;
	var maxNumOfCols = Math.sqrt(Object.keys(grid).length) - 1;
	for (var pos in this.present.grid) {
		var positions = pos.split(',');
    var xPos = positions[0];
    var state = this.isPositionAlive(xPos, positions[1]) ? 'x' : ' ';

    if (+xPos < maxNumOfCols) {
			process.stdout.write(state + ' ');
    }
    else {
			console.log(state);
    }
	}
};

Controller.prototype.isPositionAlive = function (xPos, yPos) {
  return this.present.isPositionAlive(xPos, yPos);
};

//INIT

controller = new Controller(20);
counter = 1;

tickTock = setInterval(function() {
	console.log('Generation Num: ' + counter);
	controller.tick();

	counter < 50 ? counter++ : clearInterval(tickTock);
}, 500);

module.exports = Controller;
