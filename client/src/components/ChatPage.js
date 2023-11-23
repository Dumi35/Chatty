import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
  
  const [messages, setMessages] = useState([]);
  const [activeUsers,setActiveUsers] = useState([])
  const [user,setUser] = useState([])


  useEffect(() => {
    socket.on('messageResponse', (data) => {setMessages(data);});
    //online users
    socket.on('activeUsers', (data) => {
      setActiveUsers(data);
      //console.log("active users",data)
    });  
    //receive current user typing
    socket.on('userTyping',(data)=>{
      setUser(data)
      //console.log("chat page hahaaa says",data);
    })
  },[socket,activeUsers]);
  

  return (
    <div className="chat">
{/*       <ChatBar activeUsers={activeUsers} />
 */}     <ChatBar socket={socket} activeUsers={activeUsers} />  
     <div className="chat__main">
        <ChatBody messages={messages} user={user} socket={socket}/>
         <ChatFooter socket={socket} />
     </div>
    </div>
  );
};

export default ChatPage;