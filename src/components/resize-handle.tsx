
import { CalendarCom } from "@/components/calendar-com";
import { PaginatedAccordion } from "@/components/paginated-accordion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function ResizableCom() {
    return (
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
                    <div className="flex">
                        {/* 第一列 */}
                        <PaginatedAccordion />
                    </div>
                    {/* 第二列: 包含 CalendarCom */}
                    <div className="flex justify-end">
                        {/* 只在大屏幕下显示 CalendarCom */}
                        <div className="hidden lg:block col-span-1 mt-auto">
                            <CalendarCom />
                        </div>
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}