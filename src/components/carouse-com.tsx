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

export function CarouselCom() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // 图片和文案数组
  const data = [
    {
      imageUrl: "https://theta.icu/files/17472978570614244865559.jpeg",
      text: "最美的不是下雨天,是曾与你躲过雨的屋檐。",
    },
    {
      imageUrl: "https://theta.icu/files/17473118443200559447306.jpeg",
      text: "弹指岁月倾城顷刻间烟灭，青石板街回眸一笑你婉约。‌‌",
    },
    {
      imageUrl: "https://theta.icu/files/17473131260319647903064.jpg",
      text: "冷咖啡离开了杯垫，我忍住的情绪在很后面，拼命想挽回的从前，在我脸上依旧清晰可见。",
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

  return (
    <div className="mx-auto max-w-xs">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    src={item.imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
              {current === index && (
                <TypingText
                  texts={item.text}
                  typingSpeed={150}
                  switchDelay={3000}
                  className="text-center font-medium"
                  onTypingEnd={() => {
                    if (api) {
                      api.scrollNext();
                      if (current === data.length - 1) {
                        api.scrollTo(0);
                      }
                    }
                  }}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}