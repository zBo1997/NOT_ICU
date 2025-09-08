import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { TypingText } from "@/components/typing-com";

interface CarouselItemData {
  imageUrl: string;
  text?: string; // 可选属性，允许部分项没有文本
}

export function CarouselCom() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // 图片和文案数组
  const data: CarouselItemData[] = [
    {
      imageUrl:
        "https://qcloud.dpfile.com/pc/ogsKMtgGwafhr0hDCGLl439BoywX4A8-iRcFiMLXS-LliLKBKg2H8a8ZtIl-g8t2.jpg",
    },
    {
      imageUrl:
        "https://qcloud.dpfile.com/pc/ogsKMtgGwafhr0hDCGLl439BoywX4A8-iRcFiMLXS-LliLKBKg2H8a8ZtIl-g8t2.jpg",
    },
    {
      imageUrl:
        "https://qcloud.dpfile.com/pc/ogsKMtgGwafhr0hDCGLl439BoywX4A8-iRcFiMLXS-LliLKBKg2H8a8ZtIl-g8t2.jpg",
    },
  ];

  // 监听轮播索引变化
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // 4. 优化文本校验逻辑：结合类型判断，避免 undefined 访问
  const getCurrentItem = (): CarouselItemData => {
    // 兜底：若 current 超出索引，返回第一个项
    return data[current] || data[0];
  };

  // 检查当前轮播项是否有有效文本
  const hasCurrentText = () => {
    const currentItem = data[current];
    return currentItem && currentItem.text && currentItem.text.trim() !== "";
  };

  return (
    <div className="flex flex-col items-center">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className=" p-2">
                  <img
                    src={item.imageUrl}
                    alt={`轮播图片 ${index + 1}`}
                    className="w-full h-full object-cover min-w-full min-h-full"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* 只有当当前轮播项有文本时才展示打字效果 */}
      {hasCurrentText() && (
        <TypingText
          texts={getCurrentItem().text!}
          typingSpeed={150}
          switchDelay={3000}
          className="text-center font-medium"
          onTypingEnd={() => {
            if (api) {
              // 如果是最后一项则回到第一项，否则滚动到下一项
              if (current === data.length - 1) {
                api.scrollTo(0);
              } else {
                api.scrollNext();
              }
            }
          }}
        />
      )}
    </div>
  );
}
