import { PaginatedAccordion } from "@/components/paginated-accordion"; // 导入 PaginatedAccordion

export function HomePage() {
    return (
      <div className="p-10">
        <div className="text-3xl font-semibold tracking-tight mb-6">热榜</div>
        {/* 插入 PaginatedAccordion */}
        <PaginatedAccordion />
      </div>
    );
}
