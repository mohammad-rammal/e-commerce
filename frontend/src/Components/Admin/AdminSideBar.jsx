import {Link} from 'react-router-dom';

const AdminSideBar = () => {
  return (
    <div className="sidebar">
      <div className="d-flex flex-column">
        <Link to="/admin/allorders" style={{textDecoration: 'none'}}>
          <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">Manage orders</div>
        </Link>
        <Link to="/admin/allproducts" style={{textDecoration: 'none'}}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">Product Management</div>
        </Link>
        <Link to="/admin/addbrand" style={{textDecoration: 'none'}}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">Add brand</div>
        </Link>

        <Link to="/admin/addcategory" style={{textDecoration: 'none'}}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">Add Category</div>
        </Link>

        <Link to="/admin/addsubcategory" style={{textDecoration: 'none'}}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">Add Subcategory</div>
        </Link>
        <Link to="/admin/addproduct" style={{textDecoration: 'none'}}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">Add Product</div>
        </Link>
      </div>
    </div>
  );
};
export default AdminSideBar;
