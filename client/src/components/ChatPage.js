import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
  
  const [messages, setMessages] = useState([]);
  const [activeUsers,setActiveUsers] = useState([])

 /*  socket.on('activeUsers', (data) => {
    setActiveUsers(data);
    console.log("chat page says",data);
  });   */

  useEffect(() => {
    socket.on('messageResponse', (data) => {setMessages(data);console.log("chat page says",data);});
    socket.on('activeUsers', (data) => {
      setActiveUsers(data);
      console.log("chat page says",data);
    });  
  },[socket,activeUsers]);
  
  /* useEffect(() => {
   
  });  */


  return (
    <div className="chat">
{/*       <ChatBar activeUsers={activeUsers} />
 */}     <ChatBar socket={socket} activeUsers={activeUsers} />  
     <div className="chat__main">
        <ChatBody messages={messages} />
         <ChatFooter socket={socket} />
     </div>
    </div>
  );
};

export default ChatPage;