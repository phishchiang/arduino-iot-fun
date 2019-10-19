import React, { useEffect } from 'react';
// import socket from 'socket.io-client';

export default function Chat(props) {
  let { io } = props;
  useEffect(() => {
    if (io) {
      // console.log(io);
      io.on('All', message => {
        console.log(message);
      });
    }
  }, [io]);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}
