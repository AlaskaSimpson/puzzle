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
    constructor(props){
        super(props);

        const tilenumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        this.state = {
            tiles: tilenumbers.sort(() => Math.random() -0.5)
        };
    }
    renderTile(i) {
      return <Tile value={this.state.tiles[i]}/>;
    }

    renderEmptyTile() {
        return <EmptyTile />;
    }
  
    render() {
      const status = "Number of Moves: X"
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderTile(0)}
            {this.renderTile(1)}
            {this.renderTile(2)}
            {this.renderEmptyTile()}
          </div>
          <div className="board-row">
            {this.renderTile(3)}
            {this.renderTile(4)}
            {this.renderTile(5)}
            {this.renderTile(6)}
          </div>
          <div className="board-row">
            {this.renderTile(7)}
            {this.renderTile(8)}
            {this.renderTile(9)}
            {this.renderTile(10)}
          </div>
          <div className="board-row">
            {this.renderTile(11)}
            {this.renderTile(12)}
            {this.renderTile(13)}
            {this.renderTile(14)}
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