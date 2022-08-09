import React from 'react'

function PageChangeBtns({ changePage, currentPage }) {
  return (
    <div className="pagination-adjustors">
      <button onClick={() => changePage("first page")}>First</button>
      <button onClick={() => changePage("decrement")}>Previous</button>
      <p>page {currentPage}</p>
      <button onClick={() => changePage("increment")}>Next</button>
      <button onClick={() => changePage("last page")}>Last</button>
    </div>
  )
}

export default PageChangeBtns
