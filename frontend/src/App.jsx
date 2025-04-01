import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import NavBarLogin from './Components/utilities/NavBarLogin';
import Footer from './Components/utilities/Footer';
import LoginPage from './Pages/Auth/LoginPage';
import Register from './Pages/Auth/Register';
import AllCategoryPage from './Pages/Category/AllCategoryPage';
import AllBrandPage from './Pages/Brand/AllBrandPage';
import ShopProductsPage from './Pages/Products/ShopProductsPage';
import ProductDetailsPage from './Pages/Products/ProductDetailsPage';
import CartPage from './Pages/Cart/CartPage';
import ChoosePayMethod from './Pages/Checkout/ChoosePayMethod';
import AdminAllProductsPage from './Pages/Admin/AdminAllProductsPage';
import AdminAllOrdersPage from './Pages/Admin/AdminAllOrdersPage';
import AdminOrderDetailsPage from './Pages/Admin/AdminOrderDetailsPage';
import AdminAddBrandPage from './Pages/Admin/AdminAddBrandPage';
import AdminAddCategoryPage from './Pages/Admin/AdminAddCategoryPage';
import AdminAddSubCategoryPage from './Pages/Admin/AdminAddSubCategoryPage';
import AdminAddProductPage from './Pages/Admin/AdminAddProductPage';
import UserAllOrdersPage from './Pages/User/UserAllOrdersPage';
import UserFavoriteProductsPage from './Pages/User/UserFavoriteProductsPage';
import UserAllAddressPage from './Pages/User/UserAllAddressPage';
import UserProfilePage from './Pages/User/UserProfilePage';
import UserAddAddressPage from './Pages/User/UserAddAddressPage';
import UserEditAddressPage from './Pages/User/UserEditAddressPage';

function App() {
  return (
    <div className="font">
      <NavBarLogin />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/allcategory" element={<AllCategoryPage />} />
          <Route path="/allbrand" element={<AllBrandPage />} />
          <Route path="/allproducts" element={<ShopProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/paymethod" element={<ChoosePayMethod />} />
          <Route path="/admin/allproducts" element={<AdminAllProductsPage />} />
          <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage />} />
          <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
          <Route path="/admin/addcategory" element={<AdminAddCategoryPage />} />
          <Route path="/admin/addsubcategory" element={<AdminAddSubCategoryPage />} />
          <Route path="/admin/addproduct" element={<AdminAddProductPage />} />
          <Route path="/user/allorders" element={<UserAllOrdersPage />} />
          <Route path="/user/favoriteproducts" element={<UserFavoriteProductsPage />} />
          <Route path="/user/addresses" element={<UserAllAddressPage />} />
          <Route path="/user/add-address" element={<UserAddAddressPage />} />
          <Route path="/user/edit-address" element={<UserEditAddressPage />} />
          <Route path="/user/profile" element={<UserProfilePage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
