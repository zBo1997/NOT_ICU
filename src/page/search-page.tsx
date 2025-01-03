import { TableCom } from "@/components/table-com";

export function SearchPage() {
    return (
        
            <div className="p-10">
            <div className="text-2xl font-bold tracking-tight p-10">
                {/* 这里打算留出面包屑功能 */}
            </div>
                {/* 插入 PaginatedAccordion */}
                <TableCom />
            </div>
        );
}