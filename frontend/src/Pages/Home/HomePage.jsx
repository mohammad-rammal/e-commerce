import Slider from '../../Components/Home/Slider';
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import DiscountSection from '../../Components/Home/DiscountSection';
import BrandFeatures from '../../Components/Brand/BrandFeatures';

const HomePage = () => {
  return (
    <div className="font" style={{minHeight: '670px'}}>
      <Slider />
      <HomeCategory />
      <CardProductsContainer title="Best Seller" btnTitle="More" pathText="/allproducts" />
      <DiscountSection />
      <CardProductsContainer title="Latest fashion" btnTitle="More" pathText="/allproducts" />
      <BrandFeatures title="The most famous brands" btnTitle="More" />
    </div>
  );
};

export default HomePage;
