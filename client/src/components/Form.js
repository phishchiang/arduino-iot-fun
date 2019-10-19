import React, { useState, useEffect } from 'react';
import socket from 'socket.io-client';
import Chat from './Chat';

export default function Form() {
  const [io, setIo] = useState(null);
  const [msg, setMsg] = useState('');

  let ENDPOINT = 'localhost:5000';
  // let ENDPOINT = '192.168.0.108:5000';

  const connectWebSocket = () => {
    //開啟
    setIo(socket(ENDPOINT));
  };

  useEffect(() => {
    connectWebSocket();
  }, [ENDPOINT]);

  const initWebSocket = () => {
    console.log('this is initWebSocket');
    //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    io.on('All', message => {
      console.log(message);
    });
  };

  const onChange = e => {
    e.preventDefault();
    setMsg(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    // console.log(io);
    io.emit('IOT_in', msg);
  };

  return (
    <div>
      <h1>TEST!!!!</h1>
      <form onSubmit={onSubmit}>
        <input id="m" type="text" onChange={onChange} />
        <input type="submit" />
      </form>
      <Chat io={io} />
    </div>
  );
}
