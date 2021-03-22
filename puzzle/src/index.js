import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Tile(props) {
      const tilevalue = "tile tilenumber" + props.value
      return (
        <button 
        className={tilevalue} onClick={props.onClick}>
        </button>
      );
  }
  
  class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tiles: [null, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort(() => Math.random() -0.5),
            numbermoves: 0,
            correct: 0
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
          tiles : values, 
          correct: this.getnumbercorrect(values)
        })  
    }

    getnumbercorrect(gamestate){
      const complete =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null];
      var correcttiles = []
      for (let i=0; i < complete.length; i++){
        if(gamestate[i] === complete[i]){
          correcttiles.push(correcttiles[i])
        }
      }
      return correcttiles.length
    }

    handleClick(i){   
      if (gameWon(this.state.correct) || !(movesRemaing(this.state.numbermoves))){
        return;
      }
      var moves = this.getmoves()
      var IsTileValid = moves.includes(i)
      var movenumber = this.state.numbermoves + 1
      if (IsTileValid){
        this.setState({
          numbermoves: movenumber
        })
        this.swaptiles(i,this.getemptytile())
      } 
    }

    renderTile(i) {
      const positions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
      return <Tile 
      value={this.state.tiles[i]}
      position = {positions[i]}
      onClick={() => this.handleClick(i)}
      />;
    }

    renderRow(i){
        var lefttilenumber = i*4;
        return(
        <div className="board-row">
        {this.renderTile(lefttilenumber)}
        {this.renderTile(lefttilenumber+1)}
        {this.renderTile(lefttilenumber+2)}
        {this.renderTile(lefttilenumber+3)}
        </div>
        )
    }

    NewGame(){
        this.setState(
            {tiles: [null, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort(() => Math.random() -0.5),
            numbermoves: 0,
            correct: 0
            })
    }
  
    render() {
      let completed;
      let movesmade;
      if (gameWon(this.state.correct)){
        completed = "GAME WON";
      } else if(!(movesRemaing(this.state.numbermoves))){
        completed = "GAME OVER: no more moves";
      } else{
        completed = "Number of Tiles Correct: " + this.state.correct;
        movesmade = "Moves Made: " + this.state.numbermoves;
      }

      let movesleft;
      if ((300-this.state.numbermoves) < 30){
          movesleft = "Moves Remaining: " + (300-this.state.numbermoves);
      }

      return (
        <div>
          <div className="status">{completed}</div>
          <div className="status">{movesmade}</div>
          <div className="status low-moves">{movesleft}</div>
          <div className = "board">
            {this.renderRow(0)}
            {this.renderRow(1)}
            {this.renderRow(2)}
            {this.renderRow(3)}
          </div>
          <div className = "options">
          <button className="new-game" onClick={()=> this.NewGame()}>New Game</button>
          </div>
        </div>
      ); 
    }
  }
  
  class Game extends React.Component {

    render(){
        return(
            <div className="game">
            <div className="game-board">
            <Board />
            </div>
            </div>
            );
        }
  }
  
  function gameWon(tilescorrect){
    if (tilescorrect === 16){
      return true;
    } else {
      return false;
    }
  }

  function movesRemaing(movesmade){
      if (movesmade <= 300){
          return true;
      } else {
          return false;
      }
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );