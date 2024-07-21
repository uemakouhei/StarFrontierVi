// src/components/Game.js
import React, { useState } from 'react';
import '../App.css';
import ShogiBoard from './ShogiBoard';
import { initialBoard, canMove, getMoveablePositions } from '../pieces';
import BGIMG from '../imgs/BGIMG.jpg';

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  const [moveablePositions, setMoveablePositions] = useState([]);

  const handleSquareClick = (row, col) => {
    const clickedPiece = board[row][col];

    if (selectedPiece) {
      const { piece, row: fromRow, col: fromCol } = selectedPiece;
      if (canMove(piece, fromRow, fromCol, row, col, board)) {
        const newBoard = board.map(row => row.slice());
        newBoard[row][col] = piece;
        newBoard[fromRow][fromCol] = null;
        setBoard(newBoard);
        setSelectedPiece(null);
        setMoveablePositions([]);
        setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
      } else {
        setSelectedPiece(null);
        setMoveablePositions([]);
      }
    } else if (clickedPiece && clickedPiece.player === currentPlayer) {
      setSelectedPiece({ piece: clickedPiece, row, col });
      setMoveablePositions(getMoveablePositions(clickedPiece, row, col, board));
    }
  };

  return (
    <div className="game-container" >
        <div className="board-container" >
      <ShogiBoard 
        board={board} 
        onSquareClick={handleSquareClick} 
        selectedPiece={selectedPiece} 
        moveablePositions={moveablePositions} 
      />
    </div>
    <div className="gradation">{currentPlayer === "player1" ? "My turn" : "Enemy turn"}</div>
  </div>
  );
};

export default Game;
