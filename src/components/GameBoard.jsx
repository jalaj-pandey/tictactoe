import React, { useState } from "react";


const GameBoard = ({ onSelectSquare, board }) => {
  

  // const[gameBoard, setGameBoard] = useState(initialGameBoard);
  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updateBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updateBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updateBoard;
  //   });
  //   onSelectSquare();
  // }


  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <ol>
                  <button
                    onClick={() =>onSelectSquare(rowIndex, colIndex)}
                  >
                    {playerSymbol}
                  </button>
                </ol>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
