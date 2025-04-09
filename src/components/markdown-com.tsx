import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier";

type MarkdownContentProps = { markdownContent: string };

export function MarkdownContentComp({ markdownContent }: MarkdownContentProps) {
  const formatCode = (code: string, language: string) => {
    console.log("formatCode", code, language);
    const content = "";
    try {
      const content = prettier.format(code, { parser: language });
      console.log(JSON.stringify(content));
      return content || "";
    } catch {
      return content;
    }
  };

  return (
    <div className="markdown-container">
      <ReactMarkdown
        components={{
          code({
            inline,
            className,
            children,
            ...props
          }: {
            inline?: boolean;
            className?: string;
            children?: React.ReactNode;
          }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeContent = String(children).replace(/\n$/, "");
            const language = match?.[1] || "text";

            return !inline ? (
              <SyntaxHighlighter
                style={atomDark}
                language={language}
                PreTag="div"
                wrapLongLines
              >
                {String(formatCode(codeContent, language))}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {codeContent}
              </code>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
