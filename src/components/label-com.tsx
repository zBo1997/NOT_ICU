import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LabelCom({
  items,
  placeholder = "请选择",
  value,
  onChange,
  className = "", // 新增 className 属性
}: {
  items: { value: string; label: string }[];
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
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
