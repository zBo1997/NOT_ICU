import { PaginatedAccordion } from "@/components/paginated-accordion"; // 导入 PaginatedAccordion

export function HomePage() {
    return (
        <div className="p-8">
            {/* 插入 PaginatedAccordion */}
            <PaginatedAccordion />
        </div>
    );
}
