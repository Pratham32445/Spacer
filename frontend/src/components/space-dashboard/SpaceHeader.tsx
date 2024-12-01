import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";

const SpaceHeader = ({
  spaceImage,
  messages,
  socket,
  roomId,
}: {
  spaceImage: string;
  messages: [];
  socket: WebSocket;
  roomId: string;
}) => {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    console.log(true);
    socket.send(
      JSON.stringify({
        type: "ADD_MESSAGE",
        payload: {
          token: import.meta.env.VITE_TOKEN,
          roomId,
          message,
        },
      })
    );
  };
  return (
    <div className="h-[55vh] w-full flex rounded-xl bg-muted/50 overflow-hidden">
      <div className="w-1/2">
        <img
          src={spaceImage}
          alt="Space Image"
          className="w-full h-full object-cover rounded object-center"
        />
      </div>
      <div className="w-1/2 relative">
        <div>
          <div className="p-3 mx-3">
            <p>Live Chat</p>
          </div>
          <Separator />
        </div>
        <ScrollArea>
          {messages.length > 0 ? (
            <div></div>
          ) : (
            <div className="w-full h-full flex justify-center mt-20">
              {" "}
              <p>Start Chat...</p>
            </div>
          )}
        </ScrollArea>
        <div className="absolute w-full bottom-0">
          <Separator className="my-2" />
          <div className="p-3 flex gap-1">
            <Textarea
              className="w-full resize-none overflow-hidden"
              placeholder="Enter your message here..."
              onChange={(e) => setMessage(e.target.value)}
            />
            {message.length > 0 && (
              <Button onClick={sendMessage}>
                <SendHorizonal />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceHeader;
