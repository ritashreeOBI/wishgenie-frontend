import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ChatBubble from "./ChatBubble";
import { useEffect } from "react";
import TypingLoader from "../shared-components/typing/TypingLoader";

function ChatMain() {
  const chatSectionRef = useRef(null);

  const { pending, messageQueue } = useSelector(
    (state) => state.chatInteraction
  );

  console.log(messageQueue)

  useEffect(() => {
    chatSectionRef.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [messageQueue]);

  return (
    <div className="px-6  overflow-y-scroll h-full" ref={chatSectionRef}>
      {messageQueue.map((message, idx) => {
        return (
          <ChatBubble
            data={message.message}
            key={idx}
            user={message.user}
            action={message.action}
            featureList={message.featureList}
            features={message.features}
            upload={message.upload}
          />
        );
      })}
      {pending ? (
        <div className="p-4 rounded-xl ml-4 mt-4 flex  bg-slate-100 w-16 items-center">
          <TypingLoader />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChatMain;
