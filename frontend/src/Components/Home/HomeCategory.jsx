import {Container, Row} from 'react-bootstrap';
import SubTitle from '../utilities/SubTitle';
import CategoryCard from '../Category/CategoryCard';

import clothe from '../../assets/images/clothe.png';
import cat2 from '../../assets/images/cat2.png';
import laptop from '../../assets/images/laptop.png';
import sale from '../../assets/images/sale.png';
import pic from '../../assets/images/pic.png';

const HomeCategory = () => {
  return (
    <Container>
      <SubTitle title="Categories" btnTitle="More" pathText="/allcategory" />
      <Row className="my-2 d-flex justify-content-between">
        <CategoryCard title="Home Devices" img={laptop} background="#302713" />
        <CategoryCard title="Clothes" img={clothe} background="#302713" />
        <CategoryCard title="Makeups" img={cat2} background="#302713" />
        <CategoryCard title="Sales" img={sale} background="#302713" />
        <CategoryCard title="Kitchens" img={pic} background="#302713" />
      </Row>
    </Container>
  );
};
export default HomeCategory;
