import { AppSidebar } from "@/components/app-sidebar";
import SpaceHeader from "@/components/space-dashboard/SpaceHeader";
import Spacemusic from "@/components/space-dashboard/Spacemusic";
import Spacestats from "@/components/space-dashboard/Spacestats";
import Spaceupdates from "@/components/space-dashboard/Spaceupdates";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SpaceDashboard() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [spaceInfo, setSpaceInfo] = useState<any>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    setIsLoading(true);
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "JOIN_ROOM",
          payload: {
            roomId: "fd81c95d-dd7d-4ea4-adc9-1c11215f0fb5",
            token: import.meta.env.VITE_TOKEN,
          },
        })
      );
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
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
  }, [id]);


  return !isLoading && spaceInfo && socket ? (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <SpaceHeader
            socket={socket}
            messages={[]}
            spaceImage={spaceInfo.coverPhoto}
            roomId={spaceInfo.Id}
          />
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Spacemusic />
            <Spacestats />
            <Spaceupdates />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ) : (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <LoaderCircle width={100} height={100} className="animate-spin my-3" />
        <p>Adding you in to Space...</p>
      </div>
    </div>
  );
}

export default SpaceDashboard;
