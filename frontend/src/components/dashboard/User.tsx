import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import Addsong from "../Addsong";
import { useRecoilState } from "recoil";
import { userSocket } from "@/store/State";
import { toast } from "@/hooks/use-toast";
import YouTube from "react-youtube";
import { extractYoutubeId } from "@/utils";

function Dashboard() {
  const { id } = useParams();
  const [roomInfo, setRoomInfo] = useState<any>();
  const [socket, setSocket] = useRecoilState(userSocket);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (id) {
      const WS_URL = import.meta.env.VITE_WS_URL;
      const ws = new WebSocket(WS_URL);
      const token = import.meta.env.VITE_TOKEN;
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: "JOIN_ROOM",
            payload: {
              token: token,
              roomId: id,
            },
          })
        );
      };
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        switch (message.type) {
          case "CONNECTED":
            setSocket(ws);
            break;
          case "ROOM_STATE":
            setRoomInfo(message.payload);
            break;
          case "QUEUE_UPDATE":
            // roomInfo.queue = message.payload;
            setRoomInfo((prev: any) => ({ ...prev, queue: message.payload }));
            toast({
              title: "Added",
            });
            break;
          default:
            break;
        }
      };
    }
  }, []);

  return socket && roomInfo ? (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center w-full justify-between px-4">
            <div className="flex">
              <p>{roomInfo.title}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-3 items-center">
                <div>
                  <Button onClick={() => setOpen(open ? false : true)}>
                    Song Queue
                  </Button>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p>{roomInfo.users.length}</p>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="h-[47vh] rounded-xl bg-muted/50 md:min-h-min overflow-hidden relative">
            <img
              src={roomInfo.coverPhoto}
              className="absolute inset-0 w-full h-full object-cover object-top"
              alt="Cover image"
            />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50 overflow-hidden"></div>
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
        </div>
      </SidebarInset>
      <Addsong
        open={open}
        setOpen={setOpen}
        socket={socket}
        roomInfo={roomInfo}
      />
    </SidebarProvider>
  ) : (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex justify-center flex-col items-center">
        <p>Please wait while loading space</p>
        <LoaderCircle className="animate-spin" width={100} height={100} />
      </div>
    </div>
  );
}

export default Dashboard;
