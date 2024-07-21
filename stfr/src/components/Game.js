import React, { useEffect, useState } from "react";
import "../App.css";
import ShogiBoard from "./ShogiBoard";
import { initialBoard, canMove, getMoveablePositions } from "../pieces";
import TIA from "../Cards/TIA-CER.png";
import JAC from "../Cards/JAC-CER.png";
import DAN from "../Cards/DAN-CER.png";
import Stack from "@mui/material/Stack";
import { Dialog, DialogContent } from "@mui/material";

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPieces, setSelectedPieces] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [moveablePositions, setMoveablePositions] = useState([]);
  const [movesThisTurn, setMovesThisTurn] = useState(0);
  const [movelimit, setmovelimit] = useState(0);
  const [choiceCard, setChoiceCard] = useState(null);

  useEffect(() => {
    const coins = document.querySelectorAll(".coin");
    coins.forEach((coin) => {
      coin.addEventListener("animationend", () => {
        coin.remove();
      });
    });
  }, []);

  const handleCollectCoin = () => {
    for (let i = 0; i < 100; i++) {
      const coin = document.createElement("div");
      coin.className = "coin";
      coin.style.left = `${Math.random() * 100}%`;
      coin.style.top = `${Math.random() * 100}%`;
      document.body.appendChild(coin);
    }
  };

  const handleSquareClick = (row, col) => {
    const clickedPiece = board[row][col];

    if (selectedPiece) {
      const { piece, row: fromRow, col: fromCol } = selectedPiece;

      if (canMove(piece, fromRow, fromCol, row, col, board)) {
        // Move the piece
        const newBoard = board.map((r) => r.slice());
        const capturedPiece = newBoard[row][col]; // 既存の駒を記憶
        newBoard[row][col] = piece;
        newBoard[fromRow][fromCol] = null;
        setBoard(newBoard);

        // etherタイプの駒が破壊された場合にコインのアニメーションを実行
        if (capturedPiece && capturedPiece.type === "ether") {
          handleCollectCoin();
        }

        // Add the moved piece to the list of selected pieces
        setSelectedPieces((prevSelectedPieces) => [
          ...prevSelectedPieces,
          { ...piece, row, col },
        ]);

        // Clear the selection
        setSelectedPiece(null);
        setMoveablePositions([]);

        // Update turn and moves
        const newMovesThisTurn = movesThisTurn + 1;
        if (newMovesThisTurn === movelimit) {
          setCurrentPlayer(currentPlayer === "player1" ? "player2" : "player1");
          setSelectedPieces([]);
          setSelectedPiece(null);
          setmovelimit(0);
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
      if (!selectedPieces.some((p) => p.row === row && p.col === col)) {
        setSelectedPiece({ piece: clickedPiece, row, col });
        setMoveablePositions(
          getMoveablePositions(clickedPiece, row, col, board)
        );
      }
    }
  };

  return (
    <div className="game-container">
      <Dialog
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
          position: "fixed",
          zIndex: 1000, // 最前面に表示するための zIndex
        }}
        open={!movelimit}
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'transparent', // ダイアログの紙部分を透明にする
            boxShadow: 'none', // シャドウを無効にする
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 背景の透明度を設定
          },
        }}
        maxWidth="sm"
      >
        <DialogContent>
          <Stack spacing={2} direction="row">
            <img
              style={{ width: "30%" }}
              src={TIA}
              onClick={() => {
                setmovelimit(3);
                setChoiceCard(TIA);
              }}
            />
            <img
              style={{ width: "30%" }}
              src={DAN}
              onClick={() => {
                setmovelimit(4);
                setChoiceCard(DAN);
              }}
            />
            <img
              style={{ width: "30%" }}
              src={JAC}
              onClick={() => {
                setmovelimit(2);
                setChoiceCard(JAC);
              }}
            />
          </Stack>
        </DialogContent>
      </Dialog>
      <div className="board-container">
        <ShogiBoard
          board={board}
          onSquareClick={handleSquareClick}
          selectedPiece={selectedPiece}
          moveablePositions={moveablePositions}
        />
      </div>
      <div className="gradation">{movelimit - movesThisTurn}</div>
      {choiceCard ? <img style={{ width: "10%" }} src={choiceCard} /> : null}
    </div>
  );
};

export default Game;
