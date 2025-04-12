import UnopDropdown from 'unop-react-dropdown';

import sort from '../../assets/images/sort.png';

const SearchCountResult = ({title}) => {
  const handler = () => {};

  const clickMe = (key) => {
    localStorage.setItem('sortType', key);
  };

  return (
    <div className="d-flex justify-content-between pt-3 px-2">
      <div className="sub-title">{title}</div>
      <div className="search-count-text d-flex">
        <UnopDropdown
          onAppear={handler}
          onDisappearStart={handler}
          trigger={
            <p className="mx-1">
              <img width="20px" height="20px" className="ms-1" src={sort} alt="" />
              sort by
            </p>
          }
          delay={0}
          align="CENTER"
          hover>
          <div className="card-filter">
            <div onClick={() => clickMe('')} className="border-bottom card-filter-item">
              Default
            </div>
            <div onClick={() => clickMe('Best Sellers')} className="border-bottom card-filter-item">
              Best Sellers
            </div>
            <div onClick={() => clickMe('Top Rated')} className="border-bottom card-filter-item">
              Top Rated
            </div>
            <div
              onClick={() => clickMe('Price Low to High')}
              className="border-bottom card-filter-item">
              Price Low to High
            </div>
            <div onClick={() => clickMe('Price High to Low')} className="card-filter-item">
              Price High to Low
            </div>
          </div>
        </UnopDropdown>
      </div>
    </div>
  );
};
export default SearchCountResult;
