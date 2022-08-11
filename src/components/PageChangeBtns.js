import React from "react";

function PageChangeBtns({ changePage, currentPage }) {
 const toCustomPage = (e) => {
  e.preventDefault();
  const inputPage = Number(e.target.children[0].value);
  changePage("custom", inputPage)
  e.target.children[0].value = "";
 };

 return (
  <div className="pagination-adjustors">
   <button onClick={() => changePage("first page")}>First</button>
   <button onClick={() => changePage("decrement")}>Previous</button>
   <form className="" onSubmit={toCustomPage}>
    <input type="number" placeholder={currentPage} />
   </form>
   <button onClick={() => changePage("increment")}>Next</button>
   <button onClick={() => changePage("last page")}>Last</button>
  </div>
 );
}

export default PageChangeBtns;
