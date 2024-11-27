import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    // PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

// 
interface IPaginationCom {
    totalPages: number
    currentPage: number
    className: string
    onChange: (page: number) => void
}
export function PaginationCom(props: IPaginationCom) {
    const { totalPages = 10, currentPage = 1, className = '', onChange } = props

    // 为 page 参数指定类型
    // const handlePageChange = (page: number, currentPage: number): void => {
    //     console.log(page)
    //     console.log(currentPage)
    // }

    return (
        <Pagination className={className}>
            <PaginationContent>
                {/* Previous Button */}
                {currentPage <= totalPages && currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onChange(currentPage - 1)}
                        />
                    </PaginationItem>
                )}

                {/* Current Page */}
                {/* <PaginationItem>
                    <PaginationLink
                        onClick={() => handlePageChange(totalPages, currentPage)}
                        isActive={currentPage == 1}
                    >
                        {currentPage}
                    </PaginationLink>
                </PaginationItem> */}

                {/* Ellipsis */}
                {currentPage < totalPages - 1 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}


                {/* Next Button */}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onChange(currentPage + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}
