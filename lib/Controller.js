var Board = require('./Board');

function Controller(dimension, initialStates) {
  if (!initialStates) {
    initialStates = '';
    for (var i = 0; i < dimension*dimension; i++) {
      initialStates = initialStates + String(Math.round(Math.random()));
    }
  }
  this.present = new Board(dimension, initialStates);
}

Controller.prototype.tick = function (dimension) {
  var newBoard = new Board(dimension);

  for (var pos in this.present.grid) {
    positions = pos.split(',');
    var xPos = positions[0];
    var yPos = positions[1];

    var futureState = this.present.willPositionBeAlive(xPos, yPos);
    newBoard.setPositionState(xPos, yPos, futureState);
  }

  this.present = newBoard;
};

Controller.prototype.getPresentRows = function() {
  var grid = this.present.grid;
  var gridWidth = this.present.dimension;
  var allCells = Object.keys(grid);

  var rows = [];
  var currentRow = [];
  for (var i = 1; i <= allCells.length; i++) {
    var position = allCells[i-1].split(',');
    var state = this.isPositionAlive(position[0], position[1]);
    if (i % gridWidth == 0) {
      currentRow.push({position: position, state: state});
      rows.push(currentRow);
      currentRow = [];
    }
    else {
      currentRow.push({position: position, state: state});
    }
  }
  return rows;

};

Controller.prototype.printBoard = function() {
  // prints to console
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

module.exports = Controller;
