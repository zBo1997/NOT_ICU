import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  React.ComponentProps<"input"> &
    React.ComponentProps<"textarea"> & { multiline?: boolean }
>(({ className, type, multiline = false, onChange, ...props }, ref) => {
  if (multiline) {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 resize-none", // 添加禁止调整大小的样式
          className
        )}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>} // 类型断言
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
        className
      )}
      ref={ref as React.Ref<HTMLInputElement>}
      onChange={onChange as React.ChangeEventHandler<HTMLInputElement>} // 类型断言
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
