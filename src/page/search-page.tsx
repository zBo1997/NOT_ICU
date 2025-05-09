import { TableCom } from "@/components/table-com";

export function SearchPage() {
    return (
      <div className="p-10">
        <div className="text-3xl font-semibold tracking-tight mb-6">
          回忆房间
        </div>
        {/* 插入 PaginatedAccordion */}
        <TableCom />
      </div>
    );
}