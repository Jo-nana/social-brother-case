import './pagination.styles.scss'

import { useState } from 'react';

const Pagination =({ paginate, pageNumbers, currentPage, setCurrentPage}) => {
  // setting the page number limit
  const [pageNumberLimit] = useState(7);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(7);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // Handle next and previous page
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);

    if(currentPage + 1 > maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);

    if((currentPage - 1) % pageNumberLimit === 0){
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // Handle ellipsis
  let pageIncrementBtn = null;
  if(pageNumbers.length > maxPageNumberLimit){
    pageIncrementBtn = <li className="page-item" onClick={handleNextPage}> &hellip; </li>
  }

  let pageDecrementBtn = null;
  if(pageNumbers.length > maxPageNumberLimit){
    pageDecrementBtn = <li className="page-item" onClick={handlePrevPage}> &hellip; </li>
  }

  // Render page numbers
  const renderPageNumbers = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
      <li
        key={number}
        className={"page-item" + (currentPage === number ? " page-active" : "")}
        onClick={() => paginate(number)}
      >
        {number}
      </li>)
    } else {
      return null;
    }
  });

  return(
    <nav>
      <ul className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === pageNumbers[0]} className='pagination-button'>← Previous Page</button>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <button onClick={handleNextPage} disabled={currentPage === pageNumbers[-1]} className='pagination-button'>Next Page →</button>
      </ul>
    </nav>
  )
}

export default Pagination;
