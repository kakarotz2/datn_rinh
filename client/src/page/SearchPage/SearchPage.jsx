import Axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Product from "../../components/Product/Product";
import "./search.css";
function SearchPage(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setPagination(0);
    function getData(){
      Axios.get(`/api/search${props.location.search}`)
      .then((item) => setProducts(item.data))
      .catch((err) => console.log(err));
    }
    getData()
  }, [props.location.search]);
  const showProducts = () => {
    let result = products
      .slice(pagination * 20, pagination * 20 + 20)
      .map((item, index) => {
        return (
          <Product
            id={item._id}
            name={item.name}
            url={item.url}
            price={item.price}
            key={index}
          />
        );
      });
    return result;
  };
  const [pagination, setPagination] = useState(0);
  const showPagination = () => {
    let pagi = Math.ceil(products.length / 20);
    let result = products.slice(0, pagi).map((item, index) => {
      return (
        <button
        key={index}
          className={index === pagination ? "btn_pagi active" : "btn_pagi"}
          onClick={(e) => {
            onClickpagi(e);
            setPagination(index);
          }}
        >
          {index + 1}
        </button>
      );
    });
    return result;
  };
  const onClickpagi = (e) => {
    let btnArr = document.querySelectorAll(".btn_pagi");
    btnArr.forEach((item) => {
      item.classList.remove("active");
    });
    e.target.classList.add("active");
  };
  return (
    <div>
      <Header />
      <div className="search_page">
        <div className="search-title">
          <div className="container">
            Trang chủ {">"} Kết quả tìm kiếm với{" "}
            <span>{props.location.search.slice(7).replace(/[+]/g, " ")}</span>
          </div>
        </div>
        <div className="container">
          <div className="search_products">{showProducts()}</div>
          <div style={{ marginTop: "1rem" }} className="pagination">
            {showPagination()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;
