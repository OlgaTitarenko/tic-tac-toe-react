import React from 'react';

class Reset extends React.Component {
  render() {
    return (
      <button
        onClick={() => this.props.onClick()}
      >
        New Game
      </button>
    );
  }
}

class Square extends React.Component {
  render() {
    const winClass = `square ${this.props.winClass}`;
    return (
      <button
        className={winClass}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      x: true,
    };
  }

  handleClick(i) {
    const square = [...this.state.squares];
    if (calculateWinner(square).winner || square[i]) {
      return;
    }
    square[i] = this.state.x ? 'X' : 'O';
    this.setState({
      squares: square,
      x: !this.state.x,
    });
  }

  handleClickNewGame() {
    this.setState(
      {
        squares: Array(9).fill(null),
        x: true,
      },
    );
  }

  renderSquare(i, winLine) {
    let winClass = '';
    if (winLine) {
      winClass = (winLine.indexOf(i) !== -1) ? 'winner_line' : '';
    }
    return (
      <Square
        winClass={winClass}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const { winner } = calculateWinner(this.state.squares);
    let winLine = '';
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
      winLine = calculateWinner(this.state.squares).winLine;
    } else if (this.state.squares.indexOf(null) === -1) {
      status = 'Try again...';
    } else {
      status = `Next player: ${this.state.x ? 'X' : 'O'}`;
    }
    return (
      <div>
        <div className="status">
          {status}
          {' '}
        </div>

        <div className="board-row">
          {this.renderSquare(0, winLine)}
          {this.renderSquare(1, winLine)}
          {this.renderSquare(2, winLine)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, winLine)}
          {this.renderSquare(4, winLine)}
          {this.renderSquare(5, winLine)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, winLine)}
          {this.renderSquare(7, winLine)}
          {this.renderSquare(8, winLine)}
        </div>
        <div className="new_game_button">
          <Reset
            onClick={() => this.handleClickNewGame()}
          />
        </div>
      </div>

    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return {
        winner: squares[a],
        winLine: lines[i],
      };
    }
  }
  return {
    winner: null,
    winLine: null,
  };
}
export default App;
