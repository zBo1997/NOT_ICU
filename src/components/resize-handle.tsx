import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { CardCom } from "@/components/card-com";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { HomePage } from "@/page/home-page";
import { SearchPage } from "@/page/search-page";
import { SettingsPage } from "@/page/settings-page";
import { CalendarPage } from "@/page/calender-page";

export function ResizableCom() {
    return (
        <Router>
        <SidebarProvider
        >
            <AppSidebar />
            <main className="flex-grow">
                <SidebarTrigger />
                <div className="grid gap-1 p-10">
                    <div className="text-2xl font-bold tracking-tight">
                        Don't ICU
                    </div>
                </div>
                {/* 使用 Grid 创建响应式布局 */}
                <div className="grid lg:grid-cols-2 p-10">
                    {/* 第一列: 一直展示 */}
                        <div className="">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/calendar" element={<CalendarPage />} />
                                <Route path="/search" element={<SearchPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                            </Routes>
                    </div>
                    {/* 第二列: 包含 CalendarCom */}
                    <div className="flex justify-end">
                        {/* 只在大屏幕下显示 CalendarCom */}
                        <div className="hidden lg:block col-span-1 mt-auto">
                                <CardCom />
                        </div>
                    </div>
                </div>
            </main>
        </SidebarProvider>
        </Router>
    )
}