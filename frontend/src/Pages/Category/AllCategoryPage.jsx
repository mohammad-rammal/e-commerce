import CategoryContainer from '../../Components/Category/CategoryContainer';
import Pagination from '../../Components/utilities/Pagination';
import AllCategoryPageHook from '../../hook/category/all-category-page-hook';

const AllCategoryPage = () => {
  // Destructuring
  const [category, loading, pageCount, getPage] = AllCategoryPageHook();

  return (
    <div className="min-vh-100">
      <CategoryContainer data={category.data} loading={loading} />
      {pageCount > 1 ? <Pagination pageCount={pageCount} onPress={getPage} /> : null}
    </div>
  );
};
export default AllCategoryPage;
