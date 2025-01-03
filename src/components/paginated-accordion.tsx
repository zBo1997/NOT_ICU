import { useState } from "react";
import { PaginationCom } from "@/components/pagination-content";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
const data = [
    { title: "北京一程序员加班后在家脑出血", content: "北京某一互联网公司加班导致一员工在家晕倒后脑出血。" },
    { title: "程序员常见的压力来源是什么？", content: "主要包括紧迫的项目截止日期、代码质量要求、快速变化的技术栈，以及与团队沟通的挑战。" },
    { title: "高强度编程对身体有什么影响？", content: "长期久坐和熬夜可能导致颈椎病、视力下降和疲劳过度等问题。" },
    { title: "程序员如何管理时间以减轻压力？", content: "使用工具规划任务，并将大任务拆解成小目标完成。" },
    { title: "如何与团队沟通以减少工作矛盾？", content: "保持开放的沟通态度，清晰表达问题和需求，尊重彼此的想法。" },
    { title: "程序员的职业倦怠如何解决？", content: "尝试切换项目类型，学习新技术，或者短期休假让自己恢复活力。" },
    { title: "如何处理项目延期的压力？", content: "与团队和管理层沟通实际情况，调整优先级，并制定明确的解决方案。" },
    { title: "技术更新快对程序员造成哪些压力？", content: "需要不断学习新技术可能让人感到疲惫，但适当选择学习内容可以减轻焦虑。" },
    { title: "如何通过运动缓解编程导致的疲劳？", content: "每天抽出时间进行适当的运动，比如跑步、瑜伽或健身，改善体能和心理状态。" },
    { title: "程序员如何平衡工作与生活？", content: "学会拒绝不合理的加班请求，利用业余时间培养兴趣爱好，增强生活的多样性。" },
    { title: "面对难以解决的技术问题时该怎么办？", content: "保持冷静，分解问题，或者向同事寻求帮助，避免让问题积压太久。" },
    { title: "长期加班对程序员职业生涯有何影响？", content: "可能导致身体健康问题和心理压力积累，甚至降低对工作的热情。" },
    { title: "程序员如何建立良好的工作习惯？", content: "定期代码复盘，优化工作流程，注重健康和效率的平衡。" },
    { title: "如何避免程序员之间的内卷？", content: "专注提升自己的核心能力，不盲目跟风竞争，并与团队成员形成良性合作关系。" },
    { title: "程序员应如何向管理层表达需求？", content: "用数据和实际情况支持你的观点，清晰、简洁地说明问题及解决方案。" },
    { title: "程序员需要心理咨询的表现有哪些？", content: "如果长期感到焦虑、失眠或对工作失去兴趣，可以考虑寻求专业帮助。" },
    { title: "如何在程序员职业生涯中保持成长？", content: "定期学习新技术，参与开源项目，与社区交流，不断充实自己的技术储备。" },
    { title: "团队合作中的分歧如何处理？", content: "理解对方的观点，找到共同目标，通过妥协与协作解决问题。" },
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
