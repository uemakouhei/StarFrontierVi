import React, { useEffect, useState } from "react";
import "../Effect/Fire.css";
import "../App.css";
import ShogiBoard from "./ShogiBoard";
import { initialBoard, canMove, getMoveablePositions } from "../pieces";
import Stack from "@mui/material/Stack";
import { Badge, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { CardsData } from "../pieces";

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPieces, setSelectedPieces] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [moveablePositions, setMoveablePositions] = useState([]);
  const [movesThisTurn, setMovesThisTurn] = useState(0);
  const [movelimit, setmovelimit] = useState(0);
  const [choiceCard, setChoiceCard] = useState(null);
  const [haveEther , sethaveEther] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const ShieldBadge = ({ number }) => (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <path
          d="M12 2L3 6V11C3 16.52 7.58 21.74 12 22C16.42 21.74 21 16.52 21 11V6L12 2Z"
          fill="currentColor"
        />
      </svg>
      <span
        style={{
          position: 'relative',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '12px', // 数字が小さくなりすぎる場合は調整してください
        }}
      >
        {number}
      </span>
    </div>
  );
  

  const GoldText = ({ children }) => {
    return <div className="GOLD">{children}</div>;
  };


  const [P1cards, setp1cards] = useState([
    CardsData[0],
    CardsData[4],
    CardsData[2],
  ]);
  const [P2cards, setp2cards] = useState([
    CardsData[0],
    CardsData[4],
    CardsData[2],
  ]);

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
          sethaveEther((hEther) => hEther + 1)
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
            backgroundColor: "transparent", // ダイアログの紙部分を透明にする
            boxShadow: "none", // シャドウを無効にする
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // 背景の透明度を設定
          },
        }}
        maxWidth="sm"
      >
        <DialogContent>
          <GoldText >Choice  Phase</GoldText>
          <Typography sx={{color : "white" , textAlign : "center"}} variant="caption">リーダーを選択してください。</Typography>
          <Stack spacing={2} direction="row">
            <img
              style={{ width: "30%" }}
              src={P1cards[0]?.Cardimg}
              onClick={() => {
                setmovelimit(3);
                setChoiceCard(P1cards[0]);
              }}
            />
            <img
              style={{ width: "30%" }}
              src={P1cards[1]?.Cardimg}
              onClick={() => {
                setmovelimit(4);
                setChoiceCard(P1cards[1]);
              }}
            />
            <img
              style={{ width: "30%" }}
              src={P1cards[2]?.Cardimg}
              onClick={() => {
                setmovelimit(2);
                setChoiceCard(P1cards[2]);
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
      <div direction="raw" className="gradation">
        {movelimit - movesThisTurn}
      </div>
      <div direction="raw" className="leftb">
            {haveEther}
      </div>
      {choiceCard ? (  <div direction="raw" className="gradationleft">
         <GoldText >Choice  Phase</GoldText>
      </div>) : (null)}
      {choiceCard ? (
        <Stack spacing={2} direction="row" sx={{width: "90%"}}>
        {P1cards?.map((card) => (
          <div
            key={card?.Cardimg}
            className={choiceCard?.Cardimg == card?.Cardimg ? "reflection" :""}
          >
            <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            badgeContent={<ShieldBadge number={card?.HP} />}
            >
              <img
                style={{ width: "100%" }}
                src={card?.Cardimg}
                onClick={() => {}}
                alt=""
              />
            </Badge>
            <button className="MagicB">Magic</button>
          </div>
        ))}
      </Stack>
      ) : null}
    </div>
  );
};

export default Game;
