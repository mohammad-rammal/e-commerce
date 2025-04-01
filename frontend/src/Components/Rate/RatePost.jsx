import {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

const RatePost = () => {
  const [rating, setRating] = useState(3.5);

  const setting = {
    size: 20,
    count: 5,
    color: '#979797',
    activeColor: '#ffc107',
    value: rating,
    a11y: true,
    isHalf: true,
    edit: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      setRating(newValue); // Updates state
      console.log(`New rating: ${newValue}`);
    },
  };

  return (
    <div>
      <Row className="mt-3">
        <Col sm="12" className="me-5 d-flex">
          <div className="rate-name d-inline ms-3 mt-1">Ali Muhammad</div>
          <ReactStars {...setting} />
        </Col>
      </Row>
      <Row className="border-bottom mx-2">
        <Col className="d-flex me-4 pb-2">
          <textarea className="input-form-area p-2 mt-3" rows="2" cols="20" placeholder="Write your comment...." />
          <div className="d-flex justify-content-end al">
            <div className="product-cart-add px-3 py-2 text-center d-inline">Add a comment</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default RatePost;
