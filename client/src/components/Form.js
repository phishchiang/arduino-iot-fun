import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Form() {
  const [ws, setWs] = useState(null);
  let ENDPOINT = 'http://localhost:5000';

  const connectWebSocket = () => {
    //開啟
    setWs(io(ENDPOINT));
  };

  useEffect(() => {
    connectWebSocket();
  }, [ENDPOINT]);

  const initWebSocket = () => {
    //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    ws.on('getMessage', message => {
      console.log(message);
    });
  };

  const onClick = e => {
    e.preventDefault();
    if (ws) {
      console.log(ws);
    }
    console.log('works!!!');
  };

  return (
    <div>
      <h1>TEST!!!!</h1>
      <form action="">
        <input id="m" type="text" />
        <button className="mybtn" onClick={onClick}>
          Click Me
        </button>
      </form>
    </div>
  );
}
