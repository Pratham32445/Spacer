import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { durationToMinute, getThumbnail } from "@/utils";

const Addsong = ({
  open,
  setOpen,
  roomInfo,
  socket,
}: {
  open: boolean;
  setOpen: () => void;
  roomInfo: any;
  setRoomInfo: () => void;
  socket: WebSocket;
}) => {
  const [songurl, setSongurl] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(roomInfo);
  const addInQueue = async () => {
    if (loading) return;
    if (songurl) {
      setLoading(true);
      const HTTP_URL = import.meta.env.VITE_HTTP_URL;
      const res = await axios.post(`${HTTP_URL}/song/info`, { url: songurl });
      console.log(res);
      if (res.status == 200) {
        setLoading(false);
        socket.send(
          JSON.stringify({
            type: "ADD_SONG",
            payload: {
              roomId: roomInfo.Id,
              adminId: roomInfo.adminId,
              songMetaData: {
                url: songurl,
                title: res.data.title,
                duration: res.data.duration,
              },
            },
          })
        );
      } else {
        setLoading(false);
        toast({
          title: "Please provide a valid YT url...",
        });
      }
    } else {
      setLoading(false);
      toast({
        title: "Please provide YT url..",
      });
    }
  };

  useEffect(() => {
    if (socket) return;
  }, []);

  return (
    roomInfo &&
    socket && (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          {roomInfo.isAdmin && (
            <SheetHeader>
              <SheetTitle>Add songs</SheetTitle>
              <SheetDescription>
                <p>paste your youtube url and add the song in the queue</p>
              </SheetDescription>
              <div>
                <Input
                  placeholder="Paste Yt link here..."
                  className="my-2"
                  onChange={(e) => setSongurl(e.target.value)}
                />
                <Button className="w-full my-2" onClick={addInQueue}>
                  {loading ? <LoaderCircle className="animate-spin" /> : "Add"}
                </Button>
              </div>
            </SheetHeader>
          )}
          <div className="my-10 flex flex-col h-[calc(100%-200px)]">
            <p className="my-3 text-lg">Song Queue</p>
            <ScrollArea className="flex-1">
              {roomInfo.queue.map(({ url, title, duration }) => (
                <div className="flex gap-5 mb-5 justify-between align-top">
                  <div>
                    <img src={getThumbnail(url)} />
                  </div>
                  <div>
                    <p className="text-sm my">{title}</p>
                    <Badge variant={"secondary"}>
                      <p className="text-xs">{durationToMinute(duration)}</p>
                    </Badge>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    )
  );
};

export default Addsong;
