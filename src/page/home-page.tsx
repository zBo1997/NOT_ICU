import { PaginatedAccordion } from "@/components/paginated-accordion"; // 导入 PaginatedAccordion

export function HomePage() {
    return (
        <div className="p-10">
            <div className="text-2xl font-bold tracking-tight p-10">
              今日热瓜
            </div>
            {/* 插入 PaginatedAccordion */}
            <PaginatedAccordion />
        </div>
    );
}
