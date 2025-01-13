import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CardCom } from "@/components/card-com";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "@/page/home-page";
import { SearchPage } from "@/page/search-page";
import { SettingsPage } from "@/page/settings-page";
import { ChatPage } from "@/page/chat-page";

export function ResizableCom() {
  return (
    <Router>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-grow flex-col">
          <SidebarTrigger />
          <div className="flex flex-1">
            {/* 使用 Grid 创建响应式布局 */}
            <div className="flex flex-1 flex-col lg:flex-row">
              {/* 第一列: 一直展示 */}
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/calendar" element={<ChatPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
              {/* 第二列: 包含 CalendarCom */}
              <div className="flex justify-end">
                {/* 只在大屏幕下显示 CalendarCom */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end p-10">
                  <CardCom />
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </Router>
  );
}
