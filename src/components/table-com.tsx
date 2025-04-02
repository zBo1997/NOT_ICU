import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { IdleCardCom } from "./idle-card-com";
import { useState, useEffect, useRef } from "react";

// 模拟通知数据
const allNotifications = Array.from({ length: 50 }, (_, i) => ({
  avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
  userName: `今天我们分享一个GoLang的小知识 ${i + 1}`,
  title: `如何在使用Go的协程 ${i + 1}`,
  description: ``,
  imageUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
}));

const PAGE_SIZE = 10;

export function TableCom() {
  const [notifications, setNotifications] = useState(
    allNotifications.slice(0, PAGE_SIZE)
  );
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 监听滚动事件
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [page]);

  // 模拟加载更多数据
  const loadMoreData = () => {
    const nextPage = page + 1;
    const newNotifications = allNotifications.slice(0, nextPage * PAGE_SIZE);

    if (newNotifications.length > notifications.length) {
      setNotifications(newNotifications);
      setPage(nextPage);
    }
  };

  return (
    <div
      className="overflow-y-auto max-h-[650px]"
      style={{
        /* 隐藏滚动条 */
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* Internet Explorer */,
      }}
    >
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
      <div ref={loaderRef} className="py-4 text-center">
        {notifications.length < allNotifications.length
          ? "加载更多..."
          : "---我是有底线的---"}
      </div>
    </div>
  );
}
