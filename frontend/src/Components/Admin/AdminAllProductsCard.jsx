import {useState} from 'react';
import {Button, Card, Col, Modal, Row} from 'react-bootstrap';
import {useDispatch} from 'react-redux';

import {Link, useSearchParams} from 'react-router-dom';
import {deleteProduct, getAllProductsPage} from '../../redux/actions/productAction';

const AdminAllProductsCard = ({items}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [searchParams] = useSearchParams();
  const pageFromURL = parseInt(searchParams.get('page')) || 1;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    await dispatch(deleteProduct(items._id));
    setShow(false);
    dispatch(getAllProductsPage(9, pageFromURL));
  };

  return (
    <Col xs="12" sm="6" md="5" lg="4" className="d-flex">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="font">Delete</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="font">Are you sure to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            Back
          </Button>
          <Button className="font" variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

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
            <div onClick={handleShow} className="d-inline item-delete-edit">
              Remove
            </div>
            <Link to={`/admin/editproduct/${items._id}`} style={{textDecoration: 'none'}}>
              <div className="d-inline item-delete-edit">Edit</div>
            </Link>
          </Col>
        </Row>
        <Link to={`/product/${items._id}`} style={{textDecoration: 'none'}}>
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
