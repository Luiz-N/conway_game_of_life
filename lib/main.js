// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Controller = require('./Controller');

const DIMENSION = 100;

var Cell = React.createClass({
  componentDidUpdate: function() {
    var cell = this.props.cellData;
    cellNode = React.findDOMNode(this);
    if (cell.state) {
     cellNode.classList.add('alive');
     cellNode.classList.add('was-alive');
    }
    else if (!cell.state) {
      cellNode.classList.remove('alive');
    }
  },
  render: function() {
    return (
      <span >
      </span>
    );
  }
});

var Row = React.createClass({
  render: function() {
    var cellNodes = this.props.cells.map(function(cell) {
      return (
        <Cell cellData={cell} key={cell.position}> </Cell>
      );
    })
    return (
      <div className="row">
        {cellNodes}
      </div>
    );
  }
})


var Board = React.createClass({
  getInitialState: function() {
    this.controller = new Controller(DIMENSION);
    this.counter = 1;
    return {rows: this.controller.getPresentRows()};
  },
  componentDidMount: function() {
    var board = this;
    var tickTock = setInterval(function() {
      board.controller.tick(DIMENSION);
      board.setState({rows: board.controller.getPresentRows()})

      board.counter < 50 ? board.counter++ : clearInterval(tickTock);
    }, 1000);
  },
  render: function() {
    var rowNodes = this.state.rows.map(function(rowOfCells) {
      return (
        <Row cells={rowOfCells}> </Row>
      )
    });
    return (
      <div className="board" key={this.controller}>
        <span className={'counter'}>{this.counter}</span>
        {rowNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <Board />,
  document.getElementById('example')
);
