import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { IdleCardCom } from "./idle-card-com";

// 模拟通知数据
const notifications = [
  {
    userName: "张三",
    title: "任务更新",
    description: "您有一个任务即将到期，请及时处理。",
  },
  {
    userName: "李四",
    title: "系统维护",
    description: "系统将在今晚12点进行维护，请提前保存您的工作。",
  },
  {
    userName: "王五",
    title: "新消息",
    description: "您有一条新的私信，请注意查收。",
  },
  {
    userName: "赵六",
    title: "会议提醒",
    description: "明天下午3点，产品需求讨论会议，请准时参加。",
  },
  {
    userName: "孙七",
    title: "密码更改",
    description: "您的密码已成功更改，如非本人操作请尽快联系管理员。",
  },
];

// 渲染 Table 组件
export function TableCom() {
  return (
    <Table>
      <TableBody>
        {notifications.map((notification, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <IdleCardCom notification={notification} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
