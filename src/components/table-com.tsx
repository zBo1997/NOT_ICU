import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IdleCardCom } from "./idle-card-com";
import React, { useState, useEffect, useCallback } from "react";
import { get } from "@/utils/request"; // 引入你的请求工具类

interface ImageKey {
  CreatedAt: string;
  ID: number;
  articleId: string;
  caption: string;
  imageKey: string;
  UpdatedAt: string;
  sortOrder: number;
}

interface PageArticle {
  hasMore: false;
  items: Article[];
  total: number;
}

interface Article {
  ID: number;
  CreatedAt: string;
  title: string;
  content: string;
  userId: number;
  avatarUrl: string;
  name: string;
  tagNames: string[];
  imageKeys: ImageKey[];
}

const PAGE_SIZE = 5;

export function TableCom() {
  const [article, setArticle] = useState<Article[] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(-1);
  const hasMore = React.useRef<HTMLDivElement>(null);

  const fetchArticle = useCallback(async () => {
    // 判断是否还有更多数据
    if (loading || (page > total / PAGE_SIZE && total !== -1)) return;
    setLoading(true);
    try {
      const response = await get<PageArticle>(`/pageArticle`, {
        params: {
          page,
          pageSize: PAGE_SIZE,
        },
      });
      setArticle((prev) => [...(prev || []), ...response.data.items]);
      setPage(page + 1);
      setTotal(response.data.total);
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
  }, [fetchArticle]);

  return (
    <div
      className="overflow-y-auto max-h-[650vh]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <Table>
        <TableBody>
          {article?.map((notification, index) => (
            <TableRow key={`${notification.ID}-${index}`}>
              <TableCell className="font-medium">
                <IdleCardCom article={notification} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div ref={hasMore}>
        {loading && <div className="py-4 text-center">加载中...</div>}
        {hasMore && <div className="py-4 text-center">---快他妈别翻了---</div>}
      </div>
    </div>
  );
}
