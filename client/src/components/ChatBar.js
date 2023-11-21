import React, { useEffect, useState } from 'react';

const ChatBar = ({activeUsers}) => {

  console.log(activeUsers)
  return (
    <div className="chat__sidebar">
      <h2>Chat Side Bar</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {activeUsers.map((user)=>{
            return(
              <div>
                  <p>{user.userName}</p>
              </div> 

            )
            //console.log(user)
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;