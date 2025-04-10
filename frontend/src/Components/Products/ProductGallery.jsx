import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

import LeftButton from './LeftButton';
import RightButton from './RightButton';
import ViewOneProductDetailsHook from '../../hook/product/view-one-product-details-hook';
import {useParams} from 'react-router-dom';

const ProductGallery = () => {
  const {id} = useParams();

  // eslint-disable-next-line no-unused-vars
  const [item, images, brand, category, productLike] = ViewOneProductDetailsHook(id);

  return (
    <div className="product-gallery-card d-flex justify-content-center align-items-center pt-2 ">
      <ImageGallery
        items={images}
        // defaultImage={mobile}
        showFullscreenButton={false}
        isRTL={false}
        showPlayButton={false}
        showThumbnails={false}
        renderRightNav={RightButton}
        renderLeftNav={LeftButton}
      />
    </div>
  );
};
export default ProductGallery;
