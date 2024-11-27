import { useState, useEffect, useRef } from "react";
import { PaginatedAccordion } from "@/components/paginated-accordion";
import { CalendarCom } from "@/components/calendar-com";

export function ResponsiveCom() {
    const [showCalendar, setShowCalendar] = useState(true);
    const calendarRef = useRef<HTMLDivElement>(null);
    const accordionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (calendarRef.current && accordionRef.current) {
                const calendarRect = calendarRef.current.getBoundingClientRect();
                const accordionRect = accordionRef.current.getBoundingClientRect();

                const isOverlapping = !(
                    calendarRect.right < accordionRect.left ||
                    calendarRect.left > accordionRect.right ||
                    calendarRect.bottom < accordionRect.top ||
                    calendarRect.top > accordionRect.bottom
                );

                setShowCalendar(!isOverlapping);
            }
        };

        // 初次加载 & 窗口变化时检测
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex flex-col h-full">
            {/* PaginatedAccordion 容器 */}
            <div className="flex-grow p-6 font-semibold" ref={accordionRef}>
                <PaginatedAccordion />
            </div>

            {/* CalendarCom 容器 */}
            {showCalendar && (
                <div className="">
                    <div ref={calendarRef}>
                        <CalendarCom />
                    </div>
                </div>
            )}
        </div>
    );
}
