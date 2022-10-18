import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import converse_logo1 from "../../img/converse_logo1.png";
import converse_logo2 from "../../img/converse_logo2.png";
import Axios from "axios";
import { Spin } from "antd";
function Converse() {
  const [acc_products, setAcc_products] = useState([]);
  useEffect(() => {
    Axios.get("/api/accessories").then((data) => {
      setAcc_products(data.data);
    });
  }, []);
  const show1 = () => {
    if(acc_products.length>0){
      let result = Array.from(acc_products).slice(0, 6).map((item, index) => {
        return (
          <Product
            type={item.type}
            key={index}
            name={item.name}
            url={item.url}
            id={item._id}
            price={item.price}
          />
        );
      });
      return result;
    }
    else{
      return ;
    }
  };
  const show2 = () => {
    if(acc_products.length>0){
      let result = Array.from(acc_products).slice(6, 12).map((item, index) => {
        return (
          <Product
            type={item.type}
            key={index}
            name={item.name}
            url={item.url}
            id={item._id}
            price={item.price}
          />
        );
      });
      return result;
    }
    else{
      return ;
    }
  };
  return (
    <div className="awe-section-4">
      <div className="container">
        <div className="title">
          <div className="tile-name">
            <span>phụ kiện</span>
          </div>
          <div className="btn_menu">
            <ul>
              <li>
                <Link className="menu_item" to="/">
                  balo conversse
                </Link>
              </li>
              <li>
                <Link className="menu_item" to="/">
                  áo converse
                </Link>
              </li>
              <li>
                <Link className="menu_item" to="/">
                  mũ converse
                </Link>
              </li>
              <li>
                <Link className="menu_item" to="/">
                  Xem tất cả
                </Link>
              </li>
            </ul>
          </div>
          <div className="btn-left btn-left-acc">
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="btn-right btn-right-acc">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        <div className="list_products">
          <div className="logo_product">
            <img src={converse_logo1} alt="" />
            <img src={converse_logo2} alt="" />
          </div>
          <div className="owls">
          {acc_products.length === 0 ? (
              <div className="spin">
                <Spin size="large" />
              </div>
            ) : (
              ""
            )}
            {/* Owl-item */}
            <div className="list_items list_items-acc">{show1()}</div>
            <div className="list_items list_items-acc">{show2()}</div>
            {/* End owl */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Converse;
