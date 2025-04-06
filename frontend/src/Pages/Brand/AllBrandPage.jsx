import BrandContainer from '../../Components/Brand/BrandContainer';
import Pagination from '../../Components/utilities/Pagination';
import AllBrandPageHook from '../../hook/brand/all-brand-page-hook';

const AllBrandPage = () => {
  const [brand, loading, pageCount, getPage] = AllBrandPageHook();

  return (
    <div className="min-vh-100">
      <BrandContainer data={brand.data} loading={loading} />
      {pageCount > 1 ? <Pagination pageCount={pageCount} onPress={getPage} /> : null}
    </div>
  );
};
export default AllBrandPage;
