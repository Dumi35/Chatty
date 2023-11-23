import React, { useState, useRef } from 'react';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('');
  const userName = localStorage.getItem('userName')

  const input2 = useRef()

  var play
  window.addEventListener("input",(e)=>{
    clearTimeout(play)
      play=setTimeout(()=>{
        socket.emit('isTyping',{person:``});
    },1000);
  })  


  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      
    }
    setMessage('');
  };
  return <div className="chat__footer">
    <form className="form" onSubmit={handleSendMessage}>
        <input ref={input2}
          type="text"
          placeholder="Write message"
          className="message"
          autoFocus
          value={message}
          onChange={(e) => {setMessage(e.target.value);socket.emit('isTyping',{person:`${userName} is typing`})}}
        />
        <button className="sendBtn">SEND</button>
      </form>  
    </div>;
};

export default ChatFooter;