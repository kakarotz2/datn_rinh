import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./productpage.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Radio } from "antd";
import { Select } from "antd";
import Product from "../../components/Product/Product";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
function ProductPage(props) {
  const [pagination, setPagination] = useState(0);
  const { Option } = Select;
  const [productList, setProductList] = useState([]);
  const [productList2, setProductList2] = useState([]);
  const [showDrop1, setshowDrop1] = useState(false);
  const [showDrop2, setshowDrop2] = useState(false);
  useEffect(() => {
    window.scrollTo(0,0)
    setPagination(0);
    async function getdata(slug) {
      let data = await Axios.get(`/api/${slug}`);
      setProductList(data.data);
      setProductList2(data.data);
    }
    getdata(props.match.params.slug);
    const title = () => {
      let tit = props.match.params.slug;
      console.log(tit)
      if (tit === "converse-chuck70s") {
        setTitleProduct("Điện thoại iPhone");
      } else if (tit === "converse-classic") {
        setTitleProduct("Điện thoại iPhone");
      } else if (tit === "vans-classic") {
        setTitleProduct("Điện thoại SamSung");
      } else if (tit === "vans-authentic") {
        setTitleProduct("Điện thoại SamSung");
      } else if (tit === "converse") {
        setTitleProduct("Điện thoại iPhone");
      } else if (tit === "vans") {
        setTitleProduct("Điện thoại SamSung");
      } else {
        setTitleProduct("Phụ Kiện Điện Thoại");
      }
    };
    title();
  }, [props.match.params.slug]);
  //Show product
  const showList = () => {
    if (productList.length === 0) {
      return <p>Không có sản phẩm nào</p>;
    } else {
      let result = productList
        .slice(pagination * 16, pagination * 16 + 16)
        .map((item, index) => {
          return (
            <div className="views-item" key={index}>
              <Product
                name={item.name}
                id={item._id}
                price={item.price}
                url={item.url}
              />
            </div>
          );
        });
      return result;
    }
  };
  const sidebar = () => {
    return (
      <div className="sidebar">
        <div className="sidebar_top">
          <h6>Danh mục sản phẩm</h6>
          <ul>
            <li>
              <div className="sidebar_item">
                <Link className="link-page" to="/">
                  <span>Home</span>
                </Link>
                <i className="fas fa-chevron-right"></i>
              </div>
            </li>
            <li className={showDrop1 ? "active" : ""}>
              <div className="sidebar_item">
                <Link className="link-page" to="/converse">
                  <span>iphone</span>
                </Link>
                <i
                  onClick={() => setshowDrop1(!showDrop1)}
                  className="fas fa-chevron-right"
                ></i>
              </div>
              <div className="dropdown">
                <ul>
                  <li>
                    <Link to="/converse-classic" className="link-dropdown">
                      classic
                    </Link>
                  </li>
                  <li>
                    <Link to="/converse-chuck70s" className="link-dropdown">
                      chuck 70s
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className={showDrop2 ? "active" : ""}>
              <div className="sidebar_item">
                <Link className="link-page" to="/vans">
                  <span>Samsung</span>
                </Link>
                <i
                  onClick={() => setshowDrop2(!showDrop2)}
                  className="fas fa-chevron-right"
                ></i>
              </div>
              <div className="dropdown">
                <ul>
                  <li>
                    <Link to="/vans-classic" className="link-dropdown">
                      classic
                    </Link>
                  </li>
                  <li>
                    <Link to="/vans-authentic" className="link-dropdown">
                      authentic
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="sidebar_item">
                <Link className="link-page" to="/accessories">
                  <span>phụ kiện</span>
                </Link>
                <i className="fas fa-chevron-right"></i>
              </div>
            </li>
          </ul>
        </div>
        <div className="sidebar_bot">
          <h4>Giá sản phẩm</h4>
          <Radio.Group className="radiobox" onChange={onChangeRadio}>
            <Radio checked={false} style={{ padding: "0.3rem 0" }} value={0}>
              Tất cả sản phẩm
            </Radio>
            <Radio checked={false} style={{ padding: "0.3rem 0" }} value={1}>
              Giá dưới 500.000đ
            </Radio>
            <Radio checked={false} style={{ padding: "0.3rem 0" }} value={2}>
              500.000đ-1000.000đ
            </Radio>
            <Radio checked={false} style={{ padding: "0.3rem 0" }} value={3}>
              1000.000đ - 1500.000đ
            </Radio>
            <Radio checked={false} style={{ padding: "0.3rem 0" }} value={4}>
              1500.000đ - 2000.000đ
            </Radio>
            <Radio checked={false} style={{ padding: "0.3rem 0" }} value={5}>
              2000.000đ - 2500.000đ
            </Radio>
          </Radio.Group>
        </div>
      </div>
    );
  };
  //Sort product
  function handleChange(value) {
    let newList = [];
    newList = productList2.sort((a, b) =>
      value === "decre"
        ? a.price > b.price
          ? 1
          : -1
        : a.price < b.price
        ? 1
        : -1
    );
    if (value === "incre") {
      newList = [...productList2].sort((a, b) => (a.price > b.price ? 1 : -1));
    } else if (value === "decre") {
      newList = [...productList2].sort((a, b) => (a.price < b.price ? 1 : -1));
    } else {
      newList = [...productList2].sort((a, b) => (a._id > b._id ? 1 : -1));
    }
    setProductList(newList);
  }
  //Radio
  const onChangeRadio = (e) => {
    let newArr = [];
    if (e.target.value === 0) {
      newArr = productList2;
    } else if (e.target.value === 1) {
      newArr = productList2.filter((item) => item.price <= 500000);
    } else if (e.target.value === 2) {
      newArr = productList2.filter(
        (item) => item.price > 500000 && item.price <= 1000000
      );
    } else if (e.target.value === 3) {
      newArr = productList2.filter(
        (item) => item.price > 1000000 && item.price <= 1500000
      );
    } else if (e.target.value === 4) {
      newArr = productList2.filter(
        (item) => item.price > 1500000 && item.price <= 2000000
      );
    } else {
      newArr = productList2.filter((item) => item.price > 2000000);
    }
    setProductList(newArr);
    setShowSidebar(false);
  };
  const onClickpagi = (e) => {
    let btnArr = document.querySelectorAll(".btn_pagi");
    btnArr.forEach((item) => {
      item.classList.remove("active");
    });
    e.target.classList.add("active");
  };
  const [showSidebar, setShowSidebar] = useState(false);
  const showPagination = () => {
    let pagi = Math.ceil(productList.length / 16);
    let result = productList.slice(0, pagi).map((item, index) => {
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
  const [titleProduct, setTitleProduct] = useState("");
  return (
    <React.Fragment>
      <Header />
      <div className="page">
        <div className={showSidebar ? "open_sidebar active" : "open_sidebar"}>
          <div
            className="sidebar_icon"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          </div>
          <div className="sidebar_right">{sidebar()}</div>
        </div>
        <div className="details-title">
          <div className="container">
            Trang chủ {">"} <span>{props.match.params.slug}</span>
          </div>
        </div>
        <div className="container product-page">
          <div className="sidebar_left">{sidebar()}</div>
          <div className="main_container">
            <div className="category-products">
              <p>{titleProduct}</p>
              <Select
                defaultValue="normal"
                style={{ width: 200 }}
                onChange={handleChange}
              >
                <Option value="normal">Mặc định</Option>
                <Option value="incre">Giá tăng dần</Option>
                <Option value="decre">Giá giảm dần</Option>
              </Select>
            </div>
            <div className="products-views">{showList()}</div>

            <div className="pagination">{showPagination()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default ProductPage;
