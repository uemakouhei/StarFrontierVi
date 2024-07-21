// src/components/ShogiBoard.js
import React from 'react';
import Square from './Square';

const ShogiBoard = ({ board, onSquareClick, selectedPiece, moveablePositions }) => {
  return (
    <div className="board" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 55px)', gridTemplateRows: 'repeat(7, 55px)'}}>
      {board.map((row, rowIndex) => 
        row.map((piece, colIndex) => 
          <Square 
            key={`${rowIndex}-${colIndex}`} 
            piece={piece} 
            onClick={() => onSquareClick(rowIndex, colIndex)} 
            isSelected={selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex}
            isMoveable={moveablePositions.some(([r, c]) => r === rowIndex && c === colIndex)}
          />
        )
      )}
    </div>
  );
};

export default ShogiBoard;
