import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Select } from "antd";
import itemservice1 from "../../img/item_service1.png";
import itemservice2 from "../../img/item_service2.png";
import itemservice3 from "../../img/item_service3.png";
import itemservice4 from "../../img/item_service4.png";
import ReactImageMagnify from "react-image-magnify";
import * as cartAction from "../../action/cart.action";
import * as modalAction from "../../action/modal.action";
import "antd/dist/antd.css";
import "./details.css";
import Axios from "axios";
import { useDispatch } from "react-redux";
function DetailsPage(props) {
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
    const btnNextSmall = document.querySelector(".btn-next-small");
    const btnPreSmall = document.querySelector(".btn-pre-small");
    const listItemsSmall = document.querySelector(".img-small-center");
    function scroll() {
      let i = 0;
      btnNextSmall.addEventListener("click", () => {
        let width = document.querySelector(".img-small-item").clientWidth;
        i++;
        if (i > 2) {
          i = 0;
        }
        listItemsSmall.style.transform = "translateX(" + -i * width + "px)";
      });
      btnPreSmall.addEventListener("click", () => {
        let width = document.querySelector(".img-small-item").clientWidth;
        i--;
        if (i < 0) {
          i = 2;
        }
        listItemsSmall.style.transform = "translateX(" + -i * width + "px)";
      });
    }
    scroll();
    var imgArr = [...document.querySelectorAll(".img-small-item img")];
    imgArr.forEach((item) => {
      item.addEventListener("click", () => {
        imgArr.forEach((item) => {
          item.classList.remove("img-active");
        });
        item.classList.add("img-active");
      });
    });
  }, []);
  const { Option } = Select;
  const [showmore, setShowmore] = useState(false);
  const [item, setItem] = useState({});
  const id = props.match.params.id;
  useEffect(() => {
      Axios.get(`/api/product/${id}`)
        .then((data) => setItem(data.data[0]))
        .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    if (item.url) {
      setImg_big(item.url);
    }
  }, [item]);
  const [img_big, setImg_big] = useState("");
  const showimgsmall = () => {
    let result;
    var arr = [
      item.url,
      "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/719396/pexels-photo-719396.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ];
    result = arr.map((item, index) => {
      return (
        <div key={index} className="img-small-item">
          <img onClick={() => setImg(item)} src={item} alt={index} />
        </div>
      );
    });
    return result;
  };
  const setImg = (img) => {
    setImg_big(img);
  };
  //POST data
  const [size, setSize] = useState(35);
  const [errAmount, setErrAmount] = useState("");
  const handleChange = (value) => {
    setSize(value);
  };
  const handleChangeInput = (e) => {
    setValueInput(e);
  };
  const incre = () => {
    setValueInput(Number(valueInput) + 1);
  };
  const decre = () => {
    if (valueInput <= 1) {
      setValueInput(1);
    } else {
      setValueInput(Number(valueInput) - 1);
    }
  };
  //Mua hang
  const buyNow = () => {
    if (valueInput < 1) {
      setErrAmount("Số lượng phải lớn hớn 1");
    } else {
      dispatch(
        modalAction.showModal1(id, item.url, item.name, item.price, item.type)
      );
      dispatch(
        cartAction.addToCart(
          id,
          item.url,
          item.name,
          item.price,
          Number(valueInput),
          size,
          item.type
        )
      );
      dispatch(modalAction.showModal2());
      setErrAmount("");
    }
  };
  return (
    <div>
      <Header />
      <div className="details_page">
        <div className="details-title">
          <div className="container">
            Trang chủ {">"} <span>{item.name}</span>
          </div>
        </div>
        <div className="container details_middle">
          <div className="details-product">
            {/* img */}
            <div className="details-img">
              <div className="img-big">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: img_big,
                    },
                    largeImage: {
                      src: img_big,
                      width: 700,
                      height: 700,
                      enlargedImageContainerDimensions: {
                        width: 200,
                        height: 100,
                      },
                      enlargedImageContainerClassName: "img-big",
                    },
                    isHintEnabled: true,
                    shouldHideHintAfterFirstActivation: false,
                    enlargedImagePosition: "beside",
                  }}
                />
              </div>
              <div className="img-small">
                <div className="btn-pre btn-pre-small">
                  <i className="fas fa-chevron-left"></i>
                </div>
                <div className="img-small-mid">
                  <div className="img-small-center">{showimgsmall()}</div>
                </div>
                <div className="btn-next btn-next-small">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>

            {/* end img */}

            {/* reviews */}
            <div className="reviews-product">
              <p className="reviewsname">{item.name}</p>
              <div className="star">
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <p className="rev-price">
                {item.price ? item.price.toLocaleString() : ""}₫
              </p>
              <div className="more-product">
                Được kế thừa những chi tiết của những đôi Chuck 70 đình đám{" "}
                <span>{item.name}</span> cũng được làm từ chất liệu vải Canvas
                nhưng kỹ thuật dệt hoàn hảo khiến mặt giày đẹp như một bức tranh
                vừa bắt mắt vừa tạo ra sự ôm sát cho đôi chân người dùng.
              </div>
              <div className="promotion">
                <div className="promotion-item">
                  <i className="fas fa-check-circle"></i>
                  <span>
                    Tặng thêm Tote bag + Freeship với đơn hàng từ 3.000.000đ
                  </span>
                </div>
                <div className="promotion-item">
                  <i className="fas fa-check-circle"></i>
                  <span>
                    Tặng thêm Tote bag + Freeship với đơn hàng từ 3.000.000đ
                  </span>
                </div>
                <div className="promotion-item">
                  <i className="fas fa-check-circle"></i>
                  <span>
                    Tặng thêm Tote bag + Freeship với đơn hàng từ 3.000.000đ
                  </span>
                </div>
                <div className="promotion-item">
                  <i className="fas fa-check-circle"></i>
                  <span>
                    Tặng thêm Tote bag + Freeship với đơn hàng từ 3.000.000đ
                  </span>
                </div>
              </div>
              {item.type !== "accessories" ? (
                <div className="size">
                  <span style={{ fontSize: "1.1rem", marginRight: "0.9rem" }}>
                    Kích thước
                  </span>
                  <Select
                    defaultValue="35"
                    style={{ width: 150, textAlign: "center" }}
                    onChange={(e) => handleChange(e)}
                  >
                    <Option value="35">Size : 35</Option>
                    <Option value="36">Size : 36</Option>
                    <Option value="36.5">Size : 36.5</Option>
                    <Option value="37">Size : 37</Option>
                    <Option value="38">Size : 38</Option>
                    <Option value="39">Size : 39</Option>
                    <Option value="39.5">Size : 39.5</Option>
                  </Select>
                </div>
              ) : (
                ""
              )}
              <div className="amount">
                <p
                  style={{
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  Số lượng :
                </p>
                <button className="decre" onClick={decre}>
                  <i className="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  className="number"
                  value={valueInput}
                  onChange={(e) => handleChangeInput(e.target.value)}
                />
                <button type="button" className="incre" onClick={incre}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <p style={{ color: "red" }}>{errAmount}</p>
              <div className="buy">
                <button className="btn-buynow" onClick={buyNow}>
                  <p>mua ngay</p>
                  <span>Giao hàng COD tận nơi</span>
                </button>
                <button className="btn-call">
                  <p>Gọi đặt hàng</p>
                  <span>Vui lòng gọi 012345678</span>
                </button>
              </div>
            </div>
            {/* End reviews */}
            <div className="description">
              <p className="tab_title">mô tả sản phẩm</p>
              <div className={showmore ? "tab_content active" : "tab_content"}>
                <p>
                  <strong>thông tin sản phẩm</strong>
                </p>
                <table className="tab_table">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Thương hiệu</td>
                      <td>Converse</td>
                    </tr>
                    <tr>
                      <td>Xuất xứ thương hiệu</td>
                      <td>Mỹ</td>
                    </tr>
                    <tr>
                      <td>Sản xuất tại</td>
                      <td>Việt Nam</td>
                    </tr>
                    <tr>
                      <td>Model</td>
                      <td>Converse Chuck 70</td>
                    </tr>
                    <tr>
                      <td>Chất liệu</td>
                      <td>Vải canvas - Leather</td>
                    </tr>
                    <tr>
                      <td>Hướng dẫn bảo quản</td>
                      <td>
                        <ul>
                          <li>
                            Tránh mang sản phẩm khi trời mưa hoặc thời tiết xấu
                            để chúng không bị ướt dẫn đến bong tróc.
                          </li>
                          <li>
                            Cất giữ sản phẩm ở nơi thoáng mát để giữ gìn chất
                            lượng của sản phẩm ở mức tốt nhất.
                          </li>
                          <li>Lau chùi sản phẩm thường xuyên để tránh bụi.</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Chế độ bảo hành</td>
                      <td>Bảo hành chính hãng 1 tháng theo phiếu bảo hành</td>
                    </tr>
                    <tr>
                      <td>Quy trình đóng gói</td>
                      <td>
                        <ul>
                          <li>Giày</li>
                          <li>Hộp giày</li>
                          <li>Túi đựng Converse</li>
                          <li>Phiếu bảo hành chính hãng</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  <strong>Mô tả sản phẩm</strong>
                </p>
                <p className="description-name">
                  <span>{item.name} </span> kế thừa được những đặc điểm nổi bật
                </p>
                <p>
                  Được kế thừa những chi tiết của những đôi{" "}
                  <span>{item.type}</span>70 đình đám, lần này{" "}
                  <span>{item.category}</span> lại tiếp tục tung ra một phiên
                  bản ngọt ngào dành cho các cô nàng hiện đại, yêu thích sự ngọt
                  ngào mà không quá lố, thích nổi bật mà vẫn phải thể hiện được
                  sự tinh tế.
                </p>
                <p>
                  <span>Chuck 70 Popped Colour</span> cũng được làm từ chất liệu
                  vải Canvas nhưng kỹ thuật dệt hoàn hảo khiến mặt giày đẹp như
                  một bức tranh vừa bắt mắt vừa tạo ra sự ôm sát cho đôi chân
                  người dùng.{" "}
                </p>
                <img
                  src="https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/568800c-3.jpg?v=1599930418920"
                  alt=""
                />
                <p>
                  Ngoài ra, phần đế giày màu trắng ngà thời thượng vừa trẻ trung
                  vừa mang lại một vẻ vintage, bên ngoài sản phẩm được phủ sơn
                  bóng để giày có được vẻ đẹp óng ả và sang chảnh hơn. Ở phiên
                  bản Popped Colour Chuck 70 vừa được ra mắt, phần đế ngoài yếu
                  tố kế thừa được truyền thống còn có những chi tiết mới như
                  phần đế được chia thành các layer khác nhau, vừa tạo điểm nhấn
                  vừa tạo ra sự khác biệt cho một dòng sản phẩm mới. Phần đế
                  giày ở vị trí gót còn được đệm thêm một lớp cao su lên trên đế
                  giày tạo hiệu ứng chồng thú vị và bắt mắt.{" "}
                </p>
                <div className={showmore ? "show_more active" : "show_more"}>
                  <span onClick={() => setShowmore(true)} className="more-text">
                    Xem đầy đủ
                  </span>
                  <span
                    onClick={() => setShowmore(false)}
                    className="less-text"
                  >
                    Thu gọn
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="item-service">
            <div className="wrap-item">
              <img src={itemservice1} alt="" />
              <div className="content_service">
                <p>Giao hàng siêu tốc</p>
                <span>Nhận hàng trong 24-72h</span>
              </div>
            </div>
            <div className="wrap-item">
              <img src={itemservice2} alt="" />
              <div className="content_service">
                <p>Giao hàng siêu tốc</p>
                <span>Nhận hàng trong 24-72h</span>
              </div>
            </div>
            <div className="wrap-item">
              <img src={itemservice3} alt="" />
              <div className="content_service">
                <p>Giao hàng siêu tốc</p>
                <span>Nhận hàng trong 24-72h</span>
              </div>
            </div>
            <div className="wrap-item">
              <img src={itemservice4} alt="" />
              <div className="content_service">
                <p>Giao hàng siêu tốc</p>
                <span>Nhận hàng trong 24-72h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailsPage;
