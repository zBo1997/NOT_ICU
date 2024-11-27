import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ModeToggle } from '@/components/mode-toggle'
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
                <ResizablePanelGroup direction="vertical" className="rounded-lg overflow-auto">
                    {/* Header Panel */}
                    <ResizablePanel defaultSize={10}>
                        <div className="flex items-center justify-between h-full px-6">
                            <span className="font-semibold">Don't ICU</span>
                            {/* ModeToggle in header */}
                            <ModeToggle />
                        </div>
                    </ResizablePanel>

                    <ResizableHandle />
                    <SidebarTrigger />
                    {/* Content Panel */}
                    <ResizablePanel defaultSize={90} className="overflow-y-auto">
                        {/* 使用 Grid 创建响应式布局 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 p-4">
                            {/* 第一列: 一直展示 */}
                            <div className="flex justify-center p-4 col-span-1">
                                {/* 第一列 */}
                                <PaginatedAccordion />
                            </div>
                            {/* 第二列: 包含 CalendarCom */}
                            <div className="flex justify-end p-5">
                                {/* 只在大屏幕下显示 CalendarCom */}
                                <div className="hidden lg:block col-span-1 mt-auto">
                                    <CalendarCom />
                                </div>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </SidebarProvider>
    )
}