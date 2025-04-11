import ReactPaginate from 'react-paginate';
import {useSearchParams} from 'react-router-dom';

const Pagination = ({pageCount, onPress}) => {
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;

  const handlePageClick = (data) => {
    onPress(data.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      onPageChange={handlePageClick}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="Previous"
      containerClassName={'pagination justify-content-center p-3'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      nextClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      activeClassName={'active'}
      forcePage={currentPage - 1} // Set the active page based on currentPage
    />
  );
};

export default Pagination;
