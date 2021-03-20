import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tile extends React.Component {
    render() {
      return (
        <button className="tile">
          {this.props.value}
        </button>
      );
    }
  }

class EmptyTile extends React.Component {
    render() {
      return (
        <button className="emptytile">
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderTile(i) {
      return <Tile value={i}/>;
    }

    renderEmptyTile(i) {
        return <EmptyTile />;
    }
  
    render() {
      const status = 'Number of Moves: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderTile(0)}
            {this.renderTile(1)}
            {this.renderTile(2)}
            {this.renderEmptyTile(3)}
          </div>
          <div className="board-row">
            {this.renderTile(4)}
            {this.renderTile(5)}
            {this.renderTile(6)}
            {this.renderTile(7)}
          </div>
          <div className="board-row">
            {this.renderTile(8)}
            {this.renderTile(9)}
            {this.renderTile(10)}
            {this.renderTile(11)}
          </div>
          <div className="board-row">
            {this.renderTile(12)}
            {this.renderTile(13)}
            {this.renderTile(14)}
            {this.renderTile(15)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );