import React, { Fragment, useState, useEffect } from 'react';
import socket from 'socket.io-client';
// import Chat from './Chat';

export default function Form() {
  const [io, setIo] = useState(null);
  const [chatContent, setChatContent] = useState([]);

  const [msg, setMsg] = useState('');
  const [mouseposi, setMouseposi] = useState([0, 0]);
  const [touchOn, setTouchOn] = useState(false);

  let ENDPOINT = 'localhost:5000';
  // let ENDPOINT = '192.168.0.108:5000';

  const connectWebSocket = () => {
    //開啟
    setIo(socket(ENDPOINT));
  };

  // Handle chatContent of 'IOT_in' emit!!!
  useEffect(() => {
    if (io) {
      io.emit('IOT_in', chatContent);
    }
  }, [chatContent]);

  // Handle 'ALL' listner from the server
  useEffect(() => {
    if (io) {
      io.on('All', message => {
        console.log(message);
      });
    }
  }, [io]);

  useEffect(() => {
    connectWebSocket();
  }, [ENDPOINT]);

  const onChange = e => {
    e.preventDefault();
    setMsg(e.target.value);
    // console.log(msg);
  };

  const onSubmit = e => {
    e.preventDefault();
    setChatContent([msg, ...chatContent]);
    io.emit('IOT_in', msg);
  };

  const onMouseMove = e => {
    // e.preventDefault();
    // console.log(Math.floor(e.touches[0].clientX));
    // io.emit('IOT_in', e.clientX);
    setMouseposi([
      Math.floor(e.touches[0].clientX),
      Math.floor(e.touches[0].clientY)
    ]);
  };

  // Handle touchOn of 'IOT_in' emit!!!
  useEffect(() => {
    if (io) {
      io.emit('IOT_in', touchOn);
    }
  }, [touchOn]);

  const onTouchStart = e => {
    setTouchOn(true);
    // console.log(touchOn);
    // io.emit('IOT_in', touchOn);
  };

  const onTouchEnd = e => {
    setTouchOn(false);
    // io.emit('IOT_in', touchOn);
  };

  const debounce = (func, wait = 20, immediate = true) => {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  return (
    <Fragment>
      <div>
        <h1>TEST!!!!</h1>
        <form onSubmit={onSubmit}>
          <input id="m" type="text" onChange={onChange} />
          <input type="submit" />
        </form>

        {/* <Chat io={io} chatContent={chatContent} /> */}
      </div>
      <div
        style={{ backgroundColor: 'red', width: '100vw', height: '250px' }}
        onTouchStart={onTouchStart}
        onTouchMove={debounce(onMouseMove)}
        onTouchEnd={onTouchEnd}
      >
        <div>{`X position : ${mouseposi[0]}`}</div>
        <div>{`Y position : ${mouseposi[1]}`}</div>
        <div>{`Laser gun : ${touchOn}`}</div>
      </div>
    </Fragment>
  );
}
