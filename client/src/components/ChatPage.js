import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [activeUsers,setActiveUsers] = useState([])

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  
  useEffect(() => {
    socket.on('activeUsers', (data) => setActiveUsers([...activeUsers, data]));
    //console.log(data);
  }, [socket, activeUsers]); 


  return (
    <div className="chat">
{/*       <ChatBar activeUsers={activeUsers} />
 */}      <ChatBar socket={socket} activeUsers={activeUsers} /> 
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;