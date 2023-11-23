import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

const ChatBody = ({ messages,socket,user }) => {
  const navigate = useNavigate();
  

  const handleLeaveChat = () => {
    const userName = localStorage.getItem('userName')
    socket.emit('deletedUser', {userName});
    localStorage.removeItem('userName');
    navigate('/');
    //window.location.reload();
  };

  

  return (
    <>
      <header className="chat__mainHeader">
        <p>ChatBody</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>{
          return(
            message.name === localStorage.getItem('userName') ? (
              <div className="message__chats" key={message.id}>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                  
                </div>
              </div>
            ) : (
              <div className="message__chats" key={message.id}>
                <p>{message.name}</p>
                <div className="message__recipient">
                  <p>{message.text}</p>
                </div>
              </div>
            )
          )}
        )}

        <div className="message__status">
          {user.map((userTyping)=>{
            return(
              <p>{userTyping.person}</p>
            )
          })}  
        </div>
      </div>
    </>
  );
};

export default ChatBody;