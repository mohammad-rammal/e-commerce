import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

import mobile from '../../assets/images/mobile.png';
import LeftButton from './LeftButton';
import RightButton from './RightButton';

const ProductGallery = () => {
  const images = [
    {
      original: `${mobile}`,
      thumbnail: `${mobile}`,
    },
    {
      original: `${mobile}`,
      thumbnail: `${mobile}`,
    },
    {
      original: `${mobile}`,
      thumbnail: `${mobile}`,
    },
  ];

  return (
    <div className="product-gallery-card d-flex justify-content-center align-items-center pt-2 ">
      <ImageGallery
        items={images}
        defaultImage={mobile}
        showFullscreenButton={true}
        isRTL={false}
        showPlayButton={true}
        showThumbnails={true}
        renderRightNav={RightButton}
        renderLeftNav={LeftButton}
      />
    </div>
  );
};
export default ProductGallery;
