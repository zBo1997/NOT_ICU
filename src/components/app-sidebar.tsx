import { Settings,Search,Home } from "lucide-react"
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

const data = {
  user: {
    id: "1",
    name: "Momo",
    email: "zhuzhuxia19970224@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
  },
};

// Menu items.
const items = [
  {
    title: "主页",
    url: "/",
    icon: Home,
  },
  {
    title: "找点乐子",
    url: "/search",
    icon: Search,
  },
  {
    title: "唠唠",
    url: "/calendar",
    icon: ChatBubbleIcon,
  },
  {
    title: "设置",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ICU</SidebarGroupLabel>
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
