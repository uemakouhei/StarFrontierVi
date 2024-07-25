// src/App.js
import React from 'react';
import './Effect/Fire.css';
import Game from './components/Game';
import { Stack } from '@mui/material';
import { CardsData } from './pieces';

function App() {
  return (
    <div className="App">
      <Game />
      {/* <div className="container">
      <Stack spacing={10} sx={{ overflow:"scroll"}} direction="raw">
        {CardsData.map((card, index) => (
          <div key={index} style={{width: "20vw" , color : "white" , fontStyle: "bold"}}>
            <img style={{height: "50vh"}} src={card?.Cardimg} />
            <h3>{card.Name}</h3>
            <p>HP: {card.HP} 収集力: {card.CP} 統率力: {card.LS}</p>
            <p style={{fontSize : "12px" , width: "100%", wordWrap : "break-word" ,textAlign:"center" , textDecoration:"underline"}} >{card?.Ceffect}</p>
            <p>マジックコスト: {card.Mcost}</p>
            <p style={{fontSize : "12px" , width: "100%", wordWrap : "break-word" ,textAlign:"center", textDecoration:"underline"}} >{card?.Meffect}</p>
          </div>
        ))}
    </Stack>
    </div> */}
    </div>
  );
}

export default App;
