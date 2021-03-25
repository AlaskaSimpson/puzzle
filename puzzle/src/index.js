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
            tiles: shuffletiles(),
            numbermoves: 0,
            maxmoves: 300,
            correct: 0
        };
    }

    setdifficulty(i){
        if (this.state.numbermoves >0){
            alert('Start a New Game to Change Difficulty')
        } else if (i === 0){
            this.setState({maxmoves: 100})
        } else if (i === 1){
            this.setState({maxmoves: 200})
        } else {
            this.setState({maxmoves: 300})
        }
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
      if (gameWon(this.state.correct) || !(movesRemaing(this.state.numbermoves, this.state.maxmoves))){
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
            {tiles: shuffletiles(),
            numbermoves: 0,
            correct: 0
            })
    }
  
    render() {
      let completed;
      let movesmade;
      let movesleft;
      let maxmovesallowed;
      let gameover = false;
      if (gameWon(this.state.correct)){
        completed = "GAME WON: in " + this.state.numbermoves + " moves";
        movesleft = null;
        maxmovesallowed = null;
        gameover = true;
      } else if(!(movesRemaing(this.state.numbermoves, this.state.maxmoves))){
        completed = "GAME OVER: no more moves";
        gameover=true;
      } else{
        completed = "Number of Tiles Correct: " + this.state.correct;
        movesmade = "Moves Made: " + this.state.numbermoves;
      }

      if ((this.state.maxmoves-this.state.numbermoves) < 30 && !gameover){
          maxmovesallowed = null;
          movesleft = "Moves Remaining: " + (this.state.maxmoves-this.state.numbermoves);
      } else if (!gameover){
          movesleft = null;
          maxmovesallowed = "Maximum Moves: " + this.state.maxmoves;
      }

      return (
        <div>
          <div className="status">{completed}</div>
          <div className="status">{movesmade}</div>
          <div className="status">{maxmovesallowed}</div>
          <div className="status low-moves">{movesleft}</div>
          <div className = "board">
            {this.renderRow(0)}
            {this.renderRow(1)}
            {this.renderRow(2)}
            {this.renderRow(3)}
          </div>
          <div className = "options">
          <button className="new-game" onClick={()=> this.NewGame()}>New Game</button><br></br>
          <button className="setting" onClick={()=> this.setdifficulty(2)}>Easy</button>
          <button className="setting" onClick={()=> this.setdifficulty(1)}>Medium</button>
          <button className="setting" onClick={()=> this.setdifficulty(0)}>Hard</button>
          </div>
        </div>
      ); 
    }
  }

  class Game extends React.Component {

    render(){
        return(
          <body>
            <div className = "game-title">
            <h1>15 Tile Puzzle</h1>
            </div>
            <div className="game">
            <div className="column game-info">
              <div className = "info-box">
              <h2>How to Play</h2>
              <p> The aim of the game is to rearrange the tiles into numerical order, with the empty space on the bottom right</p>
              <p> Click on a tile to move it. It is only possible to move tiles that are next to the empty space</p>
              <p> Too easy? Select a difficulty to reduce the number of moves you have to solve the puzzle</p>
              <p> Use the New Game button, to get a freshly shuffled board</p>
              </div>
            </div>
            <div className="column game-board">
            <Board />
            </div>
            </div>
          </body>
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

  function movesRemaing(movesmade, maxmoves){
      if (movesmade <= maxmoves){
          return true;
      } else {
          return false;
      }
  }


  function inversions(element,list){
      var elementindex = list.indexOf(element)
      var inversions = 0
      let index
      for (index=(elementindex+1); index < list.length; index++){
        if (element > list[index]){
            inversions = inversions + 1
        }
      }
      return inversions
  }

function getmoves(emptytile){
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

function shuffletiles(){
  var positions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null];

  let i
  for (i=0; i < 500; i++){
    var possiblemoves =[];
    var emptytileindex = positions.indexOf(null);
    possiblemoves= getmoves(emptytileindex);
    let move = possiblemoves[Math.floor(Math.random() * possiblemoves.length)];
    var tilevalue = positions[move];
    positions[move] = null;
    positions[emptytileindex] = tilevalue;
  }
  return positions;
}










  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );