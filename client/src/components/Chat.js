import React, { useState, useEffect } from 'react';
// import socket from 'socket.io-client';

export default function Chat(props) {
  // const [chatContentNew, setChatContentNew] = useState([]);
  const { io, chatContent } = props;
  useEffect(() => {
    if (io) {
      // console.log(io);
      io.on('All', message => {
        // setChatContentNew([...chatContent]);
        console.log(message);
      });
    }
  }, [io]);

  const onClick = e => {
    console.log('go');
    // setChatContent([...chatContent, chatContent]);
  };

  return (
    <div>
      <h1>Test</h1>
      <button onClick={chatContent => onClick()}>test BTN</button>
    </div>
  );
}
