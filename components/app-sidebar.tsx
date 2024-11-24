import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { SendHorizonal, Settings } from "lucide-react";
import Link from "next/link";

const Id = 33223;

const SidebarItems = [
  {
    title: "Live Chat",
    url: `/space/${Id}/messages`,
    Icon: SendHorizonal,
  },
  {
    title : "Settings",
    url : `/space/${Id}/Settings`,
    Icon : Settings
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarTrigger className="absolute right-0" />
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarMenu>
            {SidebarItems.map(({ title, url, Icon }) => (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={url} className="flex gap-3">
                    <Icon />
                    <span>{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
