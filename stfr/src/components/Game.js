import React, { useState } from 'react';
import '../App.css';
import ShogiBoard from './ShogiBoard';
import { initialBoard, canMove, getMoveablePositions } from '../pieces';

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPieces, setSelectedPieces] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  const [moveablePositions, setMoveablePositions] = useState([]);
  const [movesThisTurn, setMovesThisTurn] = useState(0);

  const handleSquareClick = (row, col) => {
    const clickedPiece = board[row][col];

    if (selectedPiece) {
      const { piece, row: fromRow, col: fromCol } = selectedPiece;

      if (canMove(piece, fromRow, fromCol, row, col, board)) {
        // Move the piece
        const newBoard = board.map(r => r.slice());
        newBoard[row][col] = piece;
        newBoard[fromRow][fromCol] = null;
        setBoard(newBoard);

        // Add the moved piece to the list of selected pieces
        setSelectedPieces((prevSelectedPieces) => [
          ...prevSelectedPieces,
          { ...piece, row, col }
        ]);

        // Clear the selection
        setSelectedPiece(null);
        setMoveablePositions([]);

        // Update turn and moves
        const newMovesThisTurn = movesThisTurn + 1;
        if (newMovesThisTurn === 3) {
          setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');       
           setSelectedPieces([]);
          setMovesThisTurn(0);
        } else {
          setMovesThisTurn(newMovesThisTurn);
        }
      } else {
        // Invalid move; reset the selection
        setSelectedPiece(null);
        setMoveablePositions([]);
      }
    } else if (clickedPiece && clickedPiece.player === currentPlayer) {
      // If the clicked piece is owned by the current player and not already moved
      if (!selectedPieces.some(p => p.row === row && p.col === col)) {
        setSelectedPiece({ piece: clickedPiece, row, col });
        setMoveablePositions(getMoveablePositions(clickedPiece, row, col, board));
      }
    }
  };

  return (
    <div className="game-container">
      <div className="board-container">
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
