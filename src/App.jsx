import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { Log } from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlaer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlaer = "O";
  }
  return currentPlaer;
}


function derivedWinner(gameBoard, players){
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const SecondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const ThirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === SecondSquareSymbol &&
      firstSquareSymbol == ThirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [players, setPlayers] = useState({ X: "Player1", O: "Player2" });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);
  
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  const winner = derivedWinner(gameBoard,players)

  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) =>
    //   currActivePlayer == "X" ? "O" : "X"
    // );
    setGameTurns((prevTurns) => {
      const currentPlaer = derivedActivePlayer(prevTurns);
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlaer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
