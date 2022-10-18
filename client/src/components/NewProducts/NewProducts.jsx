import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import headtitle from "../../img/head_title1.png";
import Axios from "axios";
import "./newproducts.css";
import Product from "./../Product/Product";
import { showModal1 } from "../../action/modal.action";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
function NewProducts(props) {
  const [newProducts, setNewProducts] = useState([]);
  const dispatch = useDispatch();
  const [card, setCard] = useState({});
  const [imgWidth, setImgWidth] = useState(0);
  useEffect(() => {
    Axios.get("/api/new").then((data) => {
      setNewProducts(data.data);
      setCard(data.data[0]);
    }).catch(err=>console.log(err));
    const circle = [...document.querySelectorAll(".circle_item")];
    for (let i = 0; i < circle.length; i++) {
      circle[i].addEventListener("click", (e) => {
        e.target.classList.add("active");
        for (let j = 0; j < circle.length; j++) {
          if (j !== i) {
            circle[j].classList.remove("active");
          }
        }
      });
    }
  }, []);
  const show1 = () => {
    if(newProducts.length>0){
      let result = Array.from(newProducts).slice(1,5).map((item, index) => {
        return (
          <Product
            key={index}
            url={item.url}
            id={item._id}
            name={item.name}
            price={item.price}
            type={item.type}
          />
        );
      });
      return result;
    }
    else {
      return ;
    }
  };
  const show2 = () => {
    if(newProducts.length>0){
      let result = Array.from(newProducts).slice(5,10).map((item, index) => {
        return (
          <>
          <Product
            key={index}
            url={item.url}
            id={item._id}
            name={item.name}
            price={item.price}
            type={item.type}
          /></>
        );
      });
      return result;
    }
    else{
      return ;
    }
  };
  const elRef = useRef(null);
  useEffect(() => {
    if (elRef.current !== null) {
      setImgWidth(elRef.current.getBoundingClientRect().width);
    }
  }, [elRef.current]);
  const box = document.querySelectorAll(".list_items-new");
  const scroll1 = () => {
    box.forEach((item) => {
      item.style.transition = "0.2s";
      item.style.transform = "translateX(" + 0 + "px)";
    });
  };
  const scroll2 = () => {
    box.forEach((item) => {
      item.style.transition = "0.2s";
      item.style.transform = "translateX(" + -imgWidth + "px)";
    });
  };
  const scroll3 = () => {
    box.forEach((item) => {
      item.style.transition = "0.2s";
      item.style.transform = "translateX(" + -2 * imgWidth + "px)";
    });
  };
  return (
    <section className="awe-section-3">
      <div className="container">
        <div className="heading_hotdeal">
          <img src={headtitle} alt="" />
          <span>Sản Phẩm Mới</span>
          <img className="up_right" src={headtitle} alt="" />
        </div>
        <div className="new_products">
          {/* product */}
          <div className="list_items list_items-new">
            {newProducts.length === 0 ? (
              <div
                className="spin"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <div className="owl-item" ref={elRef}>
                <div className="product-thumbnail">
                  <Link to={`/product/${card._id}`} className="img_product">
                    <img src={card.url} alt="" />
                  </Link>
                  <div className="new">
                    <span>New</span>
                  </div>
                </div>
                <div className="product-name">
                  <Link to="/" className="link-name">
                    {card.name}
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
                  <span>{card.price ? card.price.toLocaleString() : ""}</span>
                  <small>đ</small>
                </p>
                <div className="product-hide">
                  <Link className="more" to="/">
                    <i className="fas fa-shopping-cart"></i>
                    <span>Tùy chọn</span>
                  </Link>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(
                        showModal1(
                          card._id,
                          card.url,
                          card.name,
                          card.price,
                          card.category
                        )
                      );
                    }}
                  >
                    <i className="far fa-eye"></i>
                  </button>
                </div>
              </div>
            )}

            {newProducts.length>0?show1():""}
          </div>
          <div className="list_items list_items-new">{show2()}</div>
          {/* product */}
        </div>
      </div>
      <div className="circle">
        <button className="circle_item active" onClick={scroll1}></button>
        <button className="circle_item" onClick={scroll2}></button>
        <button className="circle_item" onClick={scroll3}></button>
      </div>
    </section>
  );
}

export default NewProducts;
