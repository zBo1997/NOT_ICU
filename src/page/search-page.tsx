import { TableCom } from "@/components/table-com";

export function SearchPage() {
    return (
      <div className="p-10">
        <div className="text-3xl font-semibold tracking-tight mb-6">荟萃</div>
        {/* 插入 PaginatedAccordion */}
        <TableCom />
      </div>
    );
}