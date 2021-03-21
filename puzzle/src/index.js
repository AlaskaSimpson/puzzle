import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Tile(props) {
      return (
        <button 
        className="tile"  onClick={props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tiles: [null, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort(() => Math.random() -0.5),
            positions: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        };
    }

    getemptytile(){
        var emptytile = this.state.tiles.indexOf(null)
        return emptytile
    }

    getmoves(){
       var emptytile = this.getemptytile()
       var validmoves = []
       var moves
        if(emptytile%4 === 0){
            moves = [(emptytile+1), (emptytile-4), (emptytile+4)]
        } else if (emptytile%4 ===3){
            moves = [(emptytile-1), (emptytile-4), (emptytile+4)]
        } else {
            moves = [(emptytile-1), (emptytile+1), (emptytile-4), (emptytile+4)]
        }
        
        for (let move of moves) {
            if (move >= 0 && move <= 15){
                validmoves.push(move)
            }           
        }
       return validmoves
    }

    swaptiles(tile1, tile2){
      var values = this.state.tiles.slice();
      var tile1value = values[tile1]
      values[tile1] = values[tile2]
      values[tile2] = tile1value    
      this.setState({
          tiles : values 
        })  
    }

    handleClick(i){   
        var moves = this.getmoves()
        var IsTileValid = moves.includes(i)
        if (IsTileValid){
            this.swaptiles(i,this.getemptytile())
        } else {
            alert('invalid move')
        }
    }

    renderTile(i) {
      return <Tile 
      value={this.state.tiles[i]}
      position = {this.state.positions[i]}
      onClick={() => this.handleClick(i)}
      />;
    }

  
    render() {
      this.getemptytile()
      const status = "Empty tile is at: " + this.getemptytile() + " and moves are " + this.getmoves();
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderTile(0)}
            {this.renderTile(1)}
            {this.renderTile(2)}
            {this.renderTile(3)}
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
  

function gameWon(tiles){
  const complete = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null];
  if (tiles == complete){
    return true
  }
  return false
}

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );