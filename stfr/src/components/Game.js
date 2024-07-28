import React, { useEffect, useState } from "react";
import "../Effect/Fire.css";
import "../App.css";
import ShogiBoard from "./ShogiBoard";
import { initialBoard, canMove, getMoveablePositions } from "../pieces";
import Stack from "@mui/material/Stack";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { CardsData } from "../pieces";
import CHSOUND from '../ChoiceSound.mp3';
import GSOUND from '../GetE.mp3';
import ETH from '../imgs/ether.png';

const Game = () => {
  const [start, setstartup] = useState(true);
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPieces, setSelectedPieces] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [moveablePositions, setMoveablePositions] = useState([]);
  const [movesThisTurn, setMovesThisTurn] = useState(0);
  const [movelimit, setmovelimit] = useState(0);
  const [choiceCard, setChoiceCard] = useState(null);
  const [haveEther, sethaveEther] = useState({ player1 : 0 , player2 : 0});
  const [slctcard, setslctCard] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [GS , setGS] = useState(null);
  const [CS , setCS] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const GetS = new Audio(GSOUND);
    const ChoS= new Audio(CHSOUND);
    GetS.load(); // 音声ファイルの事前ロード
    ChoS.load();
    setCS(ChoS);
    setGS(GetS);
  },[])
  const playSound = (sound) => {
    sound.pause();  // 再生中の音声を停止
    sound.currentTime = 0;  // 再生位置をリセット
    sound.play();  // 新たに再生
  };


  const ETHS = ({ haveether }) => {
    return (
      <div direction="raw" className="leftb">
        {Array.from({ length: haveEther?.player1 }).map((_, index) => (
          <img
            key={index}
            src={ETH}
            className="ether-image"
            style={{ left: `${index * 10}px`}} // 位置をずらす
          />
        ))}
      </div>
    );
  };
  

  function playSoundMenu(Sound) {
    const audio = new Audio(Sound);
    audio.play();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const ShieldBadge = ({ number }) => (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <path
          d="M12 2L3 6V11C3 16.52 7.58 21.74 12 22C16.42 21.74 21 16.52 21 11V6L12 2Z"
          fill="currentColor"
        />
      </svg>
      <span
        style={{
          position: "relative",
          color: "white",
          fontWeight: "bold",
          fontSize: "12px", // 数字が小さくなりすぎる場合は調整してください
        }}
      >
        {number}
      </span>
    </div>
  );

  const CRYSTALText = ({ children }) => {
    return <div className="CRYSTAL">{children}</div>;
  };

  const GoldText = ({ children }) => {
    return <div className="GOLD">{children}</div>;
  };

  const [P1cards, setp1cards] = useState([
    CardsData[0],
    CardsData[4],
    CardsData[2],
  ]);
  const [P2cards, setp2cards] = useState([
    CardsData[1],
    CardsData[3],
    CardsData[4],
  ]);

  const [Actvcard, setActvCard] = useState([
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
          //sethaveEther((hEther) => hEther + selectedPiece?.piece?.CP);
          sethaveEther(prevState => ({
            ...prevState,
            player1: prevState.player1 + selectedPiece?.piece?.CP
          }));
          playSound(GS);
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
          setActvCard(currentPlayer === "player1" ? P2cards : P1cards);
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
      <Dialog open={start} onClose={() => setstartup(false)}>
        <DialogActions><TextField/><Button onClick={() => setstartup(false)}>ROOMID検索</Button></DialogActions>
        <Divider />
        <DialogActions>
        <TextField /><Button onClick={() => setstartup(false)}>Player1参加</Button>
        </DialogActions>
        <Divider />
        <DialogActions>
          {" "}
          <TextField /><Button onClick={() => setstartup(false)}>Player2参加</Button>
        </DialogActions>
      </Dialog>
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
          <CRYSTALText>{currentPlayer}</CRYSTALText>
          <GoldText>Choice Phase</GoldText>
          <Typography
            sx={{ color: "white", textAlign: "center" }}
            variant="caption"
          >
            リーダーを選択してください。
          </Typography>
          <Stack spacing={2} direction="row">
            {Actvcard?.map((card) => (
              <img
                style={{ width: "30%" }}
                src={card?.Cardimg}
                onClick={() => {
                  playSound(CS);
                  setmovelimit(3);
                  setChoiceCard(card);
                }}
              />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
      <div className="board-container">
        <ShogiBoard
          currentPlayer={currentPlayer}
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
           <ETHS haveether={haveEther.player1}/>
      </div>
      <div direction="raw" className="bottomb">
              {haveEther.player1}
      </div>
      {choiceCard ? (
        <div direction="raw" className="gradationleft">
          <GoldText> Slide Phase</GoldText>
        </div>
      ) : null}
      {choiceCard ? (
        <Stack spacing={2} direction="row" sx={{ width: "90%" }}>
          {Actvcard?.map((card) => (
            <div
              key={card?.Cardimg}
              className={
                choiceCard?.Cardimg == card?.Cardimg ? "reflection" : ""
              }
            >
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                badgeContent={<div>{choiceCard?.Cardimg == card?.Cardimg  ? ( <GoldText>R</GoldText>) : (<CRYSTALText>N</CRYSTALText>)}<ShieldBadge number={card?.HP} /></div>}
              >
                <img
                  style={{ width: "100%" }}
                  src={card?.Cardimg}
                  onClick={() => {
                    setAnchorEl(true);
                    setslctCard(card);
                  }}
                  alt=""
                />
              </Badge>
            </div>
          ))}
        </Stack>
      ) : null}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ opacity: "0.8", width: "100%" }}
      >
        <MenuItem onClick={handleClose}>{slctcard?.Name}</MenuItem>
        <MenuItem onClick={handleClose} sx={{ overflowWrap: "normal" }}>
          <Typography variant="caption" className="typography-wrap">
            {slctcard?.Meffect}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          必要コスト : {slctcard?.Mcost}
        </MenuItem>
        <MenuItem>
          <Button sx={{ textAlign: "center", width: "100%" }}>発動</Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Game;
