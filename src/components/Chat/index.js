import React from "react";
import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";
import ChatFotter from "./ChatFotter";

function ChatWindow() {
  return (
    <div className="flex flex-col h-full w-full chat-message">
      <div className="h-[12%] drop  ">
        <ChatHeader />
      </div>
      <div className="h-[73%] ">
        <ChatMain />
      </div>
      <div className="h-[15%]">
        <ChatFotter />
      </div>
    </div>
  );
}

export default ChatWindow;
