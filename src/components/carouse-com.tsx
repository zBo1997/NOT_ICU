import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function CarouselCom() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // 图片数组
  const images = [
    "https://www.louisvuitton.cn/images/is/image/lv/1/PP_VP_L/%E8%B7%AF%E6%98%93%E5%A8%81%E7%99%BB-lv-x-tm-speedy-bandouli%C3%A8re-25-%E6%89%8B%E8%A2%8B-%E5%85%B6%E4%BB%96monogram-%E5%B8%86%E5%B8%83-%E5%A5%B3%E5%A3%AB%E5%8C%85%E8%A2%8B--M13085_PM2_Front%20view.png?wid=4096&hei=4096",
    "https://www.louisvuitton.cn/images/is/image/lv/1/PP_VP_L/%E8%B7%AF%E6%98%93%E5%A8%81%E7%99%BB-lv-x-tm-speedy-bandouli%C3%A8re-20-%E6%89%8B%E8%A2%8B-monogram-%E5%A5%B3%E5%A3%AB%E5%8C%85%E8%A2%8B--M14175_PM2_Front%20view.png?wid=4096&hei=4096",
    "https://www.louisvuitton.cn/images/is/image/lv/1/PP_VP_L/%E8%B7%AF%E6%98%93%E5%A8%81%E7%99%BB-lv-x-tm-%E5%8D%A1%E5%A4%B9-monogram-%E5%B0%8F%E5%9E%8B%E7%9A%AE%E5%85%B7--M13439_PM2_Front%20view.png?wid=1440&hei=1440",
    "https://www.louisvuitton.cn/images/is/image/lv/1/PP_VP_L/%E8%B7%AF%E6%98%93%E5%A8%81%E7%99%BB-idylle-blossom-18k%E9%87%91-%E9%92%BB%E7%9F%B3%E9%95%BF%E8%80%B3%E7%8E%AF-%E6%8C%89%E7%B1%BB%E5%88%AB%E6%B5%8F%E8%A7%88--Q96413_PM1_Worn%20view.png?wid=1440&hei=1440",
  ];

  return (
    <div className="mx-auto max-w-xs">
      <Carousel
        setApi={setApi}
        className="w-full max-w-xs"
        plugins={[Autoplay({ delay: 2500 })]}
      >
        <CarouselContent>
          {images.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        第 {current} 款 | 还有 {count - current} 款
      </div>
    </div>
  );
}
