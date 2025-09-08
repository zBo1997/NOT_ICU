import { Settings, Search, Home } from "lucide-react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { NavUser } from "@/components/nav-user";
import { UserProvider } from "@/common/user-context";
// Menu items.
const items = [
  {
    title: "Panic",
    url: "/",
    icon: Home,
  },
  {
    title: "Record",
    url: "/publish",
    icon: Search,
  },
  {
    title: "Explain",
    url: "/calendar",
    icon: ChatBubbleIcon,
  },
  {
    title: "Who am I ?",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const user = UserProvider();

  return (
    <Sidebar variant="floating" className="w-64">
      <SidebarHeader>ICU</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="absolute bottom-20 left-0 w-full flex justify-center">
        {/* <PopoverCom /> */}
        <ModeToggle />
      </div>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
