import {useState} from 'react';
import {Row} from 'react-bootstrap';
import SidebarSearchHook from '../../hook/search/sidebar-search-hook';

const SideFilter = () => {
  const [category, brand, clickCategory, clickBrand] = SidebarSearchHook();

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const toggleCategories = () => setShowAllCategories(!showAllCategories);
  const toggleBrands = () => setShowAllBrands(!showAllBrands);

  return (
    <div className="mt-3">
      <Row>
        {/* Category Filter */}
        <div className="d-flex flex-column mt-2">
          <div className="filter-title">Category</div>
          <div className="d-flex mt-3">
            <input type="checkbox" value="0" />
            <div className="filter-sub ms-2">All</div>
          </div>
          {category &&
            (showAllCategories ? category : category.slice(0, 5)).map((item, index) => (
              <div key={index} className="d-flex mt-2">
                <input onChange={clickCategory} type="checkbox" value={item._id} />
                <div className="filter-sub ms-2">{item.name}</div>
              </div>
            ))}
          {category && category.length > 5 && (
            <div
              className="filter-sub text-primary mt-2"
              style={{cursor: 'pointer'}}
              onClick={toggleCategories}>
              <div style={{textAlign: 'left'}}>{showAllCategories ? 'Show Less' : 'Show All'}</div>
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div className="d-flex flex-column mt-2">
          <div className="filter-title mt-3">Brand</div>
          <div className="d-flex mt-3">
            <input type="checkbox" value="0" />
            <div className="filter-sub ms-2">All</div>
          </div>
          {brand &&
            (showAllBrands ? brand : brand.slice(0, 5)).map((item, index) => (
              <div onChange={clickBrand} key={index} className="d-flex mt-2">
                <input type="checkbox" value={item._id} />
                <div className="filter-sub ms-2">{item.name}</div>
              </div>
            ))}
          {brand && brand.length > 5 && (
            <div
              className="filter-sub text-primary mt-2"
              style={{cursor: 'pointer'}}
              onClick={toggleBrands}>
              <div style={{textAlign: 'left'}}> {showAllBrands ? 'Show Less' : 'Show All'}</div>
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="filter-title my-3">Price</div>
        <div className="d-flex">
          <p className="filter-sub my-2">From:</p>
          <input
            className="m-2 text-center"
            type="number"
            style={{width: '50px', height: '25px'}}
          />
        </div>
        <div className="d-flex">
          <p className="filter-sub my-2 pe-3">To:</p>
          <input
            className="m-2 text-center"
            type="number"
            style={{width: '50px', height: '25px'}}
          />
        </div>
      </Row>
    </div>
  );
};

export default SideFilter;
