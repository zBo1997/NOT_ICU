import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ModeToggle } from '@/components/mode-toggle'
import { CalendarCom } from "@/components/calendar-com";
import { PaginatedAccordion } from "@/components/paginated-accordion";

export function ResizableCom() {
    return (
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

            {/* Content Panel */}
            <ResizablePanel defaultSize={90} className="relative overflow-y-auto h-full">
                {/* 使用 Grid 创建响应式布局 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full">
                    {/* 第一列: 小屏幕时隐藏 */}
                    <div className="hidden lg:block col-span-1 mt-auto">
                        {/* 第一列 */}
                        第一列的内容
                    </div>

                    {/* 第二列: 一直展示 */}
                    <div className="flex items-center justify-center p-4 col-span-1">
                        {/* 第二列 */}
                        <PaginatedAccordion />
                    </div>

                    {/* 第三列: 包含 CalendarCom */}
                    <div className="relative flex items-center justify-end p-4">
                        {/* 只在大屏幕下显示 CalendarCom */}
                        <div className="hidden lg:block col-span-1 mt-auto">
                            <CalendarCom />
                        </div>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>

    )
}