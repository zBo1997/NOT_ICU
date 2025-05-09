import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PublishCom() {
  return (
    <Card className="flex flex-col">
      {/* 头部 */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          titile
        </CardTitle>
      </CardHeader>

      {/* 消息内容区域 */}
      <CardContent>这里是内容区域</CardContent>

      {/* 输入框和按钮 */}
      <CardFooter className="flex space-x-2"></CardFooter>
    </Card>
  );
}
