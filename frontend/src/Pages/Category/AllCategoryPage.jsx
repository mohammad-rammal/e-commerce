import CategoryContainer from '../../Components/Category/CategoryContainer';
import Pagination from '../../Components/utilities/Pagination';

const AllCategoryPage = () => {
  return (
    <div className="min-vh-100">
      <CategoryContainer />
      <Pagination />
    </div>
  );
};
export default AllCategoryPage;
