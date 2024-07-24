// src/App.js
import React from 'react';
import './Effect/Fire.css';
import Game from './components/Game';
import { Stack } from '@mui/material';
import { CardsData } from './pieces';

function App() {
  return (
    <div className="App">
      {/* <Game /> */}
      <div className="container">
      <Stack spacing={10} sx={{ bgcolor: "white"}} direction="raw">
        {CardsData.map((card, index) => (
          <div key={index} style={{width: "20vw"}}>
            <img style={{height: "50vh"}} src={card?.Cardimg} />
            <p>{card.Name}</p>
            <p>HP: {card.HP}</p>
            <p>収集力: {card.CP}</p>
            <p>統率力: {card.LS}</p>
            <p>マジックコスト: {card.Mcost}</p>
            <p style={{fontSize : "12px" , width: "100%", wordWrap : "break-word" ,textAlign:"center"}} >{card?.Ceffect}</p>
            <p style={{fontSize : "12px" , width: "100%", wordWrap : "break-word" ,textAlign:"center"}} >{card?.Meffect}</p>
          </div>
        ))}
    </Stack>
    </div>
    </div>
  );
}

export default App;
