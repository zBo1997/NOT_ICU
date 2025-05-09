import { PublishCom } from "@/components/publish-com"; // 导入 PaginatedAccordion

export function HomePage() {
  return (
    <div className="p-10">
      <div className="text-3xl font-semibold tracking-tight mb-6">记录回忆</div>
      {/* 插入 PaginatedAccordion */}
      <PublishCom />
    </div>
  );
}
