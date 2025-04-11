import {Card, Col, Row} from 'react-bootstrap';

import {Link} from 'react-router-dom';

const AdminAllProductsCard = ({items}) => {
  return (
    <Col xs="12" sm="6" md="5" lg="4" className="d-flex">
      <Card
        className="my-2"
        style={{
          width: '100%',
          height: '350px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#FFFFFF',
        }}>
        <Row className="d-flex justify-content-center px-2">
          <Col className="d-flex justify-content-between">
            <div className="d-inline item-delete-edit">Remove</div>
            <div className="d-inline item-delete-edit">Edit</div>
          </Col>
        </Row>
        <Link to="/products/:id" style={{textDecoration: 'none'}}>
          <Card.Img style={{height: '228px', width: '100%'}} src={items.imageCover} />
          <Card.Body>
            <Card.Title>
              <div className="card-title">
                {items.title.length > 15 ? items.title.slice(0, 15) + '...' : items.title}
              </div>
            </Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-between">
                <div className="card-rate">{items.ratingsQuantity}</div>
                <div className="d-flex">
                  <div className="card-currency mx-1">$</div>
                  <div className="card-price">{items.price}</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};
export default AdminAllProductsCard;
