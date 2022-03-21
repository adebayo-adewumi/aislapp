import React from 'react';
import { usePagination, DOTS } from '../Pagination/usePagination';

const Pagination = (props: { onPageChange: any; totalCount: any; siblingCount?: 1 | undefined; currentPage: any; pageSize: any}) => {

  const {onPageChange,totalCount,siblingCount = 1,currentPage,pageSize} = props;

  const paginationRange = usePagination({currentPage,totalCount,siblingCount,pageSize});

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];
  
  return (
    <div>
        <div>
            <ul className='pagination list-none font-bold flex space-x-2 justify-start cursor-pointer text-sm'>
                <li style={{backgroundColor: 'transparent'}}>
                    <button onClick={onPrevious} disabled={currentPage === 1} className="font-bold border-0 cursor-pointer" style={{backgroundColor: 'transparent'}}>&lsaquo; Previous</button>  
                </li>

                {paginationRange!.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return <li className="text-color-9 rounded-lg">&#8230;</li>;
                    }

                    return (
                    <li className={pageNumber === currentPage ? 'text-color-9 rounded-lg active':'text-color-9 rounded-lg'} onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </li>
                    );
                })}

                <li style={{backgroundColor: 'transparent'}}>
                    <button className="border-0 cursor-pointer font-bold" onClick={onNext} disabled={currentPage === lastPage} style={{backgroundColor: 'transparent'}}>Next &rsaquo;</button>                    
                </li>
            </ul>
        </div>
    </div>

    // <ul
    //   className={classnames('pagination-container', { [className]: className })}
    // >
    //   <li
    //     className={classnames('pagination-item', {
    //       disabled: currentPage === 1
    //     })}
    //     onClick={onPrevious}
    //   >
    //     <div className="arrow left" />
    //   </li>
    //   {paginationRange.map(pageNumber => {
    //     if (pageNumber === DOTS) {
    //       return <li className="pagination-item dots">&#8230;</li>;
    //     }

    //     return (
    //       <li
    //         className={classnames('pagination-item', {
    //           selected: pageNumber === currentPage
    //         })}
    //         onClick={() => onPageChange(pageNumber)}
    //       >
    //         {pageNumber}
    //       </li>
    //     );
    //   })}
    //   <li
    //     className={classnames('pagination-item', {
    //       disabled: currentPage === lastPage
    //     })}
    //     onClick={onNext}
    //   >
    //     <div className="arrow right" />
    //   </li>
    // </ul>
  );
};

export default Pagination;
