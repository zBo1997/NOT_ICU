import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Tags {
  ID: string; // 文章ID
  CreatedAt: string; // 文章标题
  UpdatedAt: string; // 文章内容
  DeletedAt: string; // 文章图片
  tag: string; // 作者名称
  userId?: string; // 作者头像
}

export function LabelCom({
  items,
  placeholder = "请选择",
  value,
  onChange,
  className = "", // 新增 className 属性
}: {
  items: Tags[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string; // 支持传递自定义样式
}) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={`${className}`}>
        {" "}
        {/* 应用自定义样式 */}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>选项</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.ID} value={item.tag}>
              {item.tag}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
