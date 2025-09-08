import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
// import { CardCom } from "@/components/card-com";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/page/home-page";
import { SearchPage } from "@/page/search-page";
import { SettingsPage } from "@/page/settings-page";
import { ChatPage } from "@/page/chat-page";

export function ResizableCom() {
  // const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col min-h-0">
        <SidebarTrigger />
        <div className="flex flex-1 min-h-0">
          {/* 主内容和侧边卡片响应式布局 */}
          <div className="flex flex-1 flex-col lg:flex-row min-h-0">
            {/* 主内容区 */}
            <div className="flex-1 min-h-0 overflow-auto">
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/publish" element={<HomePage />} />
                <Route path="/calendar" element={<ChatPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
            {/* 卡片区 */}
            {/* {location.pathname !== "/publish" && (
              <div className="hidden lg:flex lg:items-center lg:justify-end p-10">
                <CardCom />
              </div>
            )} */}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
