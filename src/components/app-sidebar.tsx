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

// 获取用户信息
const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
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
  const user = getUser(); // 获取用户信息

  return (
    <Sidebar>
      <SidebarHeader>NOT'ICU</SidebarHeader>
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
