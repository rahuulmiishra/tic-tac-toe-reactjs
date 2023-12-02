import logo from "./logo.svg";
import "./App.css";
import {  useState } from "react";



const Player = {
  A: 0,
  B: 1
}

const PlayerMoves  = {
  [Player.A]: "",
  [Player.B]: "",
}

const WinningCondition = ["012", "345", "678", "036", "147", "258", "048", "246"];

function App() {
 
  const [player, setPlayer] = useState(Player.A);
  const [playerMoves, setPlayerMoves] = useState({...PlayerMoves});
  const [hasWon, setHasWon] = useState(false);

  function handleClick(e) {


    const whichPlayer = e?.target?.dataset?.playerType;
    const moveId = e.target.getAttribute('data-move-id');

    if(!whichPlayer) {
      return;
    }



    const prevMoves = {...playerMoves};
    prevMoves[whichPlayer] = `${prevMoves[whichPlayer]}${moveId}`

    const playerSteps =  prevMoves[whichPlayer];

    const isWinCondition1 = WinningCondition.some(win => {
          return playerSteps.split("").sort().join("").includes(win);
    });

    const isWinCondition2  = WinningCondition.some(pattern => canFormPattern(playerSteps, pattern));
    const isWin = isWinCondition1 || isWinCondition2;

    setHasWon(isWin);

    if(isWin) {
     setPlayer(Player.A);
     setPlayerMoves({...PlayerMoves});
    } else {
      const currentPlayer = player === Player.A ? Player.B : Player.A;
      setPlayer(currentPlayer);
      setPlayerMoves(prevMoves);
    }





  
  }

  function canFormPattern(inputString, pattern) {
    return pattern.split("").every(digit => inputString.includes(digit));
  }

  

  return (
    <div className="App">
      <div onClick={handleClick} className="board">
           {Array.from(new Array(9)).map((_, index)=> {


          
            
              let mark = '';
              if(playerMoves[Player.A].includes(`${index}`)){ 
                  mark = 'X'; 
              } else if(playerMoves[Player.B].includes(`${index}`)) {
                mark = 'O'; 
              }



              return <button key={index} data-player-type={mark ? '' :player} data-move-id={index} >{mark}</button>
           })}
      </div>

      {hasWon && <h1>{player} has won</h1>}
    </div>
  );
}

export default App;
