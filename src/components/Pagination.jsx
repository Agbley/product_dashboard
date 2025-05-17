import React from 'react';

export default function Pagination({ total, perPage, page, setPage }) {
  const totalPages = Math.ceil(total / perPage);
  const nextPage = () => setPage(p => Math.min(p + 1, totalPages));
  const prevPage = () => setPage(p => Math.max(p - 1, 1));

  return (
    <div className="flex justify-center mt-4 gap-2 items-center">
      <button onClick={prevPage} disabled={page === 1} className="px-3 py-1 rounded bg-gray-300">←</button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={nextPage} disabled={page === totalPages} className="px-3 py-1 rounded bg-gray-300">→</button>
    </div>
  );
}