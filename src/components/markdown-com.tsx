import ReactMarkdownLib from "react-markdown"; // 为了避免命名冲突，这里给 ReactMarkdown 组件改个别名

// 定义 MarkdownContent 类型
type MarkdownContentProps = {
  markdownContent: string; // Markdown 内容
};

export function MarkdownContentComp({ markdownContent }: MarkdownContentProps) {
  return (
    <div className="markdown-container">
      {/* 使用 ReactMarkdownLib 来渲染 Markdown 内容 */}
      <ReactMarkdownLib>{markdownContent}</ReactMarkdownLib>
    </div>
  );
}
