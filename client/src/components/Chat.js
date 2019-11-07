import React, { useState, useEffect } from 'react';
// import socket from 'socket.io-client';

export default function Chat(props) {
  const [chatContentNew, setChatContentNew] = useState([]);
  const { io, chatContent } = props;
  useEffect(() => {
    if (io) {
      // console.log(io);
      io.on('All', message => {
        // setChatContentNew([...message]);
        console.log(message);
      });
    }
  }, [io]);

  return (
    <div>
      {/* <button>test BTN</button> */}
      <h2>
        {/* {chatContentNew.map(item => {
          return <div key={item.length}>{item}</div>;
        })} */}
      </h2>
    </div>
  );
}
