import { MouseEventHandler } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onNextPage: MouseEventHandler<HTMLButtonElement>
    onPrevPage: MouseEventHandler<HTMLButtonElement>
}

function Pagination({ currentPage, totalPages, onPageChange, onNextPage, onPrevPage }: PaginationProps) {

  return (
    <div className="bottom-0 flex justify-center mt-20 gap-4 mb-9">
    <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-[#d6d6d6] cursor-not-allowed" : "bg-[#d6d6d6] hover:bg-[#b0b0b0]"}`}
    >
        &lt;
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
        <button
            key={i}
            className={`p-2 py-1 rounded-md w-8 ${currentPage === i + 1 ? "bg-[#4A4A4A] text-white" : "border border-[#4A4A4A]"
                }`}
            onClick={() => onPageChange(i + 1)}
        >
            {i + 1}
        </button>
    ))}

    <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-[#d6d6d6] cursor-not-allowed" : "bg-[#d6d6d6] hover:bg-[#b0b0b0]"}`}
    >
        &gt;
    </button>
</div>
  )
}

export default Pagination
