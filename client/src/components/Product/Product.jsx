import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {showModal1} from '../../action/modal.action'
import {getWidth} from '../../action/img.action'
import "./product.css";
function Product(props) {
  const { name, url, price, id,type } = props;
  const dispatch = useDispatch()
  const imgRef = useRef(null)
  const img = useSelector(state => state.img)
  useEffect(() => {
    if(img.width>0){
      return ;
    }
    else if(imgRef.current&&img.width===0){
      dispatch(getWidth(imgRef.current.offsetWidth))
    }
  }, [])
  return (
    <React.Fragment>
      <div className="owl-item" ref={imgRef} >
   
        <div className="product-thumbnail">
          <Link to={`/product/${id}`} className="img_product" >
            <img src={url} alt="" />
          </Link>
          <div className="new">
              <span>New</span>
            </div>
        </div>
        <div className="product-name">
          <Link to={`/product/${id}`} className="link-name">
            {name}
          </Link>
        </div>
        <div className="review">
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
        </div>
        <p className="product-price">
          <span>{price?price.toLocaleString():""}</span>
          <small>đ</small>
        </p>
        <div className="product-hide">
          <Link className="more" to={`/product/${id}`}>
            <i className="fas fa-shopping-cart"></i>
            <span>Tùy chọn</span>
          </Link>
          <button style={{cursor:"pointer"}} onClick={()=>{
            dispatch(showModal1(id,url,name,price,type))
          }}>
            <i className="far fa-eye"></i>
          </button>
        </div>

      </div>
    </React.Fragment>
  );
}

export default Product;
