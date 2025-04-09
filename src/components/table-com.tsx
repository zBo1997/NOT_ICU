import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IdleCardCom } from "./idle-card-com";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Users } from "lucide-react";

interface Notification {
  id: string;
  avatarUrl: string;
  userName: string;
  title: string;
  description: string;
  imageUrl: string;
}

const PAGE_SIZE = 5;

export function TableCom() {
  const [article, setArticle] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(-1); // 假设总数据量为100
  const hasMore = React.useRef<HTMLDivElement>(null);

  const fetchArticle = useCallback(async () => {
    // 判断是否还有更多数据
    if (loading || (page > total / PAGE_SIZE && total != -1)) return;
    setLoading(true);

    try {
      const response = await axios.get(`/api/pageArticle`, {
        params: {
          page,
          pageSize: PAGE_SIZE,
        },
      });

      setArticle((prev) => [...prev, ...response.data.items]);
      setPage((prev) => prev + 1);
      setTotal(response.data.total); // 更新总数据量
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, page, total]);

  useEffect(() => {
    const ob = new IntersectionObserver((entries) => {
      const ele = entries[0];
      if (ele.isIntersecting && hasMore.current) {
        fetchArticle();
      }
    }, {});
    const currentHasMore = hasMore.current;
    if (currentHasMore) ob.observe(currentHasMore);
    return () => {
      if (currentHasMore) {
        ob.unobserve(currentHasMore);
      }
    };
  });
  return (
    <div
      className="overflow-y-auto max-h-[650px]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <Table>
        <TableBody>
          {article.map((notification, index) => (
            <TableRow key={`${notification.id}-${index}`}>
              <TableCell className="font-medium">
                <IdleCardCom notification={notification} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div ref={hasMore}>
        {loading && <div className="py-4 text-center">加载中...</div>}
      </div>
      {!hasMore && <div className="py-4 text-center">---我是有底线的---</div>}
    </div>
  );
}
