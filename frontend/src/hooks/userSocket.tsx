import { useEffect, useState } from "react";

const useSocket = (url: string, roomId: string, token: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [spaceInfo, setSpaceInfo] = useState<any>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    if (!roomId || !token || !url) return;
    setIsLoading(true);
    const ws = new WebSocket(url);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "JOIN_ROOM",
          payload: {
            roomId: "fd81c95d-dd7d-4ea4-adc9-1c11215f0fb5",
            token,
          },
        })
      );
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case "CONNECTED":
          setIsLoading(false);
          setSocket(ws);
          break;
        case "ROOM_STATE":
          setSpaceInfo(message.payload);
          break;
        case "NEW_MESSAGE":
          console.log(message);
          break;
        default:
          break;
      }
    };
  }, [roomId]);
  return { isLoading, spaceInfo, socket };
};

export default useSocket;
