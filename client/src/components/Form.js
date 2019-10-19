import React, { useState, useEffect } from 'react';
import socket from 'socket.io-client';

export default function Form() {
  const [io, setIo] = useState(null);
  // let ENDPOINT = 'localhost:5000';
  let ENDPOINT = '192.168.0.108:5000';

  const connectWebSocket = () => {
    //開啟
    setIo(socket(ENDPOINT));
  };

  useEffect(() => {
    connectWebSocket();
  }, [ENDPOINT]);

  const initWebSocket = () => {
    //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    io.on('getMessage', message => {
      console.log(message);
    });
  };

  const onClick = e => {
    e.preventDefault();
    // io.on('leddd', )
    io.emit('IOT', 'Light!!');
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
