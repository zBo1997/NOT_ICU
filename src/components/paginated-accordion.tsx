import { useState } from "react";
import { PaginationCom } from "@/components/pagination-content";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
const data = [
  {
    title: "LV Speedy系列包包价格",
    content:
      "Speedy 25（Monogram帆布）价格约为9,600元人民币；Speedy 30价格约为10,000元人民币。",
  },
  {
    title: "LV Neverfull系列包包价格",
    content:
      "Neverfull MM（Monogram帆布）价格约为11,900元人民币；Epi皮革版本价格约为13,900元人民币。",
  },
  {
    title: "LV Alma系列包包价格",
    content: "Alma BB（Monogram帆布）价格约为12,200元人民币。",
  },
  {
    title: "LV Noé系列包包价格",
    content: "Noé水桶包（Monogram帆布）价格约为14,500元人民币。",
  },
  {
    title: "LV Capucines系列包包价格",
    content:
      "Capucines BB价格约为27,000元人民币，该系列价格区间在2万至3万元人民币。",
  },
  {
    title: "LV Dauphine系列包包价格",
    content: "Dauphine价格从28,500元人民币起。",
  },
  {
    title: "LV Boite Chapeau Souple系列包包价格",
    content: "Boite Chapeau Souple MM价格约为24,000元人民币。",
  },
  {
    title: "LV Side Trunk系列包包价格",
    content: "Side Trunk价格约为3,200欧元。",
  },
  {
    title: "LV Papillon系列包包价格",
    content: "Papillon BB价格约为2,200欧元。",
  },
  {
    title: "LV Cannes系列包包价格",
    content: "Cannes圆筒包价格约为2,400欧元。",
  },
  { title: "LV Loop系列包包价格", content: "Loop月亮包价格约为1,950欧元。" },
  {
    title: "LV包包价格区间总结",
    content:
      "入门级款式价格在5,000至10,000元人民币之间；中高端款式价格在10,000至30,000元人民币之间；奢华限量款价格在30,000元人民币以上。",
  },
  {
    title: "LV包包购买建议",
    content:
      "LV包包价格因款式、材质、尺寸和是否为限量版等因素而有所不同，建议在购买前通过官方渠道或授权零售商获取最准确的价格信息。",
  },
];

export function PaginatedAccordion() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10; // 每页显示2个折叠面板
    const totalPages = Math.ceil(data.length / itemsPerPage); // 计算总页数

    // 当前页数据
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full max-w-lg mx-auto font-semibold">
            {/* Accordion 内容 */}
            <Accordion type="single" collapsible>
                {currentItems.map((item, index) => (
                    <AccordionItem key={startIndex + index} value={`item-${startIndex + index + 1}`}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>{item.content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* 分页控件 */}
            <div className="mt-4 flex justify-center">
                <PaginationCom
                    totalPages={totalPages} // 修改为正确的属性名
                    currentPage={currentPage}
                    onChange={(page: number) => setCurrentPage(page)}
                    className="flex gap-2"
                />

            </div>
        </div>
    );
}
