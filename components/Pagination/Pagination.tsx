import { Dispatch, SetStateAction } from "react";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ totalPages, page, setPage }: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={css.pagination}>
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className={css.button}
      >
        &larr;
      </button>
      {pageNumbers.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`${css.button} ${page === p ? css.active : ""}`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className={css.button}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;