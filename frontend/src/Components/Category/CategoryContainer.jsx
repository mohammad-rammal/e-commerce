import {Container, Row} from 'react-bootstrap';
import CategoryCard from './CategoryCard';

import clothe from '../../assets/images/clothe.png';
import cat2 from '../../assets/images/cat2.png';
import laptop from '../../assets/images/laptop.png';
import sale from '../../assets/images/sale.png';
import pic from '../../assets/images/pic.png';

const CategoryContainer = () => {
  return (
    <Container>
      <div className="admin-content-text mt-2">All Categories </div>
      <Row className="my-2 d-flex justify-content-between">
        <CategoryCard title="Home Devices" img={clothe} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={cat2} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={laptop} background="#0034FF" />
        <CategoryCard title="Home Devices" img={sale} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={clothe} background="#FF6262" />
        <CategoryCard title="Home Devices" img={pic} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={clothe} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={cat2} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={laptop} background="#0034FF" />
        <CategoryCard title="Home Devices" img={sale} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={clothe} background="#FF6262" />
        <CategoryCard title="Home Devices" img={pic} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={clothe} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={cat2} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={laptop} background="#0034FF" />
        <CategoryCard title="Home Devices" img={sale} background="#F4DBA4" />
        <CategoryCard title="Home Devices" img={clothe} background="#FF6262" />
        <CategoryCard title="Home Devices" img={pic} background="#F4DBA4" />
      </Row>
    </Container>
  );
};
export default CategoryContainer;
