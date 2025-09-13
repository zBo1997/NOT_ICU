import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { TypingText } from "@/components/typing-com";

/* ---------- 1. 类型定义 ---------- */
export interface CarouselItemData {
  imageKey: string;
  caption?: string; // 可选
}

export interface CarouselComProps {
  data?: CarouselItemData[]; // 外部传入，可选
}

/* ---------- 2. 组件：支持外部 data ---------- */
export function CarouselCom({ data = [] }: CarouselComProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [typingKey, setTypingKey] = React.useState(0);

  /* 监听轮播索引变化 */
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);
      setTypingKey(newIndex); // 重置打字效果
    };
    api.on("select", onSelect);
    onSelect(); // 初始化
  }, [api]);

  /* 获取当前项 */
  const getCurrentItem = (): CarouselItemData => data[current] ?? {};

  /* 是否有有效文本 */
  const hasCurrentText = () => {
    const item = data[current];
    return !!item?.caption?.trim();
  };

  /* 空数组保护：没有数据时不渲染轮播，防止报错 */
  if (!data.length) return null;
  return (
    <div className="flex flex-col h-full w-full">
      {/* 轮播图 */}
      <Carousel
        setApi={setApi}
        className="w-full h-full max-h-[300px] relative"
      >
        <CarouselContent className="h-full">
          {data.map((item, idx) => (
            <CarouselItem key={idx} className="h-full">
              <Card className="h-full border-none shadow-none">
                <CardContent className="p-0 h-full m-0">
                  <img
                    src={`https://theta.icu/files/${item.imageKey}`}
                    alt={`slide-${idx}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 打字文本 */}
      <div className="mt-3 min-h-[40px] flex items-center justify-center px-2">
        {hasCurrentText() ? (
          <TypingText
            key={typingKey}
            texts={getCurrentItem().caption!}
            typingSpeed={100}
            switchDelay={3000}
            className="text-center font-medium text-base text-foreground/90"
            onTypingEnd={() => {
              if (!api) return;
              if (current === data.length - 1) {
                api.scrollTo(0); // 回到第一张
              } else {
                api.scrollNext(); // 下一张
              }
            }}
          />
        ) : (
          <div className="h-6" /> // 占位
        )}
      </div>
    </div>
  );
}
