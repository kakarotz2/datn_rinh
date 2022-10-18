import React,{ useEffect, useState } from "react";
import { Formik } from "formik";
import logowearn from "../../img/logowearn.png";
import "./checkout.css";
import { Radio } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import Axios from "axios";
import * as cartAction from "../../action/cart.action";
function CheckoutPage() {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { userInfo } = user;
  const { cartList } = cart;
  const showOrder = () => {
    let res;
    if (cartList.length === 0) {
      return <p>Giỏ hàng trống</p>;
    } else {
      res = cartList.map((item, index) => {
        return (
          <div className="order_item" key={index}>
            <div className="item">
              <div className="item_img">
                <span>{item.amount}</span>
                <img src={item.url} alt="" />
              </div>
              <div className="item_name">
                <span>{item.name}</span>

                <br />
                {item.type === "accessories" ? (
                  ""
                ) : (
                  <span style={{ color: "gray", fontSize: "0.8rem" }}>
                    Size:{" "}
                    <span style={{ color: "gray", fontSize: "0.8rem" }}>
                      {item.size}
                    </span>{" "}
                  </span>
                )}
              </div>
              <span>{item.price.toLocaleString()}₫</span>
            </div>
          </div>
        );
      });
    }
    return res;
  };
  const count1 = () => {
    let result = 0;
    cartList.forEach((item) => {
      result += item.amount;
    });
    return result;
  };
  const handleCancel1 = () => {
    setModal1(false);
  };
  const handleCancel2 = () => {
    setModal2(false);
  };
   const [listHidden, setListHidden] = useState(false);
  return (
    <div className="checkout_page container">
      <Formik
        initialValues={{
          email: userInfo.user ? userInfo.user.email : '',
          name: userInfo.user ? userInfo.user.firstName+ " "+userInfo.user.lastName : '',
          numberphone: "",
          address: "",
          note: "",
        }}
        enableReinitialize={true}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Vui lòng nhập email";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Email không hợp lệ";
          }
          if (!values.name) {
            errors.name = "Vui lòng nhập họ tên";
          }
          if (!values.numberphone) {
            errors.numberphone = "Vui lòng nhập số điện thoại";
          } else if (
            !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/i.test(
              values.numberphone
            )
          ) {
            errors.numberphone = "Số điện thoại không hợp lệ";
          }
          if (!values.address) {
            errors.address = "Vui lòng nhập địa chỉ";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          if (cartList.length > 0) {
            setModal1(true);
          } else {
            alert("Giỏ hàng không có sản phẩm nào! Không thể thanh toán");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          /* and other goodies */
        }) => (
          <form className="formOrder" id="formOr" onSubmit={handleSubmit}>
            <Modal visible={modal1} footer={null} onCancel={handleCancel1}>
              <div className="box_confirm">
                <h4>Bạn chắc chắn muốn mua hàng chứ?</h4>
                <div className="btn_confirm">
                  <button className="cancel" onClick={handleCancel1}>
                    Hủy bỏ
                  </button>
                  <button
                    onClick={() => {
                      Axios.post("/order", {
                        user: userInfo.user ? userInfo.user._id : null,
                        email: values.email,
                        name: values.name,
                        product: cartList,
                        paymentMethod: "Thanh toán khi giao hàng",
                        phonenumber: values.numberphone,
                        address: values.address,
                        note: values.note,
                      }).then(() => {
                        dispatch(cartAction.deleteAll());
                        setModal2(true);
                        setModal1(false);
                      });
                    }}
                    className="confirm"
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            </Modal>
            <Modal visible={modal2} footer={null} onCancel={handleCancel2}>
              <div className="box_success">
                <div className="icon_success">
                  <i className="far fa-check-circle"></i>
                </div>
                <p style={{ fontSize: "1.5rem" }}>
                  Cảm ơn quý khách đã mua hàng!
                </p>
                <button>
                  <Link style={{ color: "#fff" }} to="/">
                    Trở về trang chủ
                  </Link>
                </button>
              </div>
            </Modal>
            <div className="wrap">
              <div className="main">
                <div className="main_header">
                  <Link to="/">
                    <img src={logowearn} alt="" />
                  </Link>
                </div>
                <div className="order_hidden">
                  <button
                    style={{ outline: "none" }}
                    onClick={() => setListHidden(!listHidden)}
                  >
                    <span>
                      Đơn hàng (<span>{count1()}</span>sản phẩm)
                    </span>
                    <span>
                      Xem chi tiết<i className="fas fa-chevron-down"></i>
                    </span>
                  </button>
                  <div
                    className={
                      listHidden ? "order_items active" : "order_items"
                    }
                  >
                    {showOrder()}
                  </div>
                  <div className="flex" style={{ marginTop: "1rem" }}>
                    <span>Tạm tính</span>
                    <span>{cart.total ? cart.total.toLocaleString() : 0}₫</span>
                  </div>
                  <div className="shipping-fee flex">
                    <span>Phí vận chuyển</span>
                    <span>30.000đ</span>
                  </div>
                  <div className="total_sidebar flex">
                    <span>Tổng cộng</span>
                    <span>
                      {cart.total
                        ? (cart.total + 30000).toLocaleString()
                        : "30.000"}
                      ₫
                    </span>
                  </div>
                </div>
                <div className="main_content">
                  <div className="order">
                    <div className="content_title">
                      <span>Thông tin nhận hàng</span>
                      {userInfo.user ? (
                        ""
                      ) : (
                        <span>
                          <Link to="/login">
                            <i className="fas fa-user"></i>
                            <span>Đăng nhập</span>
                          </Link>
                        </span>
                      )}
                    </div>
                    <div className="form_order">
                      <div className="field">
                        <label>Email:</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <p className="msg-err">
                          {errors.email && touched.email && errors.email}
                        </p>
                      </div>
                      <div className="field">
                        <label>Họ tên:</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        <p className="msg-err">
                          {errors.name && touched.name && errors.name}
                        </p>
                      </div>
                      <div className="field">
                        <label>Số điện thoại:</label>
                        <input
                          type="text"
                          name="numberphone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.numberphone}
                        />
                        <p className="msg-err">
                          {errors.numberphone &&
                            touched.numberphone &&
                            errors.numberphone}
                        </p>
                      </div>
                      <div className="field">
                        <label>Địa chỉ:</label>
                        <textarea
                          name="address"
                          id=""
                          rows="3"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                        ></textarea>
                        <p className="msg-err">
                          {errors.address && touched.address && errors.address}
                        </p>
                      </div>
                      <div className="field">
                        <label>Ghi chú</label>
                        <textarea
                          name="note"
                          id=""
                          rows="5"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.note}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="shipping">
                    <p>Vận chuyển</p>
                    <small>Vui lòng nhập thông tin giao hàng</small>
                    <br />
                    <p>Thanh toán</p>
                    <div>
                      <Radio checked={true}>
                        Thanh toán khi giao hàng (COD)
                      </Radio>
                      <span>
                        <i className="far fa-money-bill-alt"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main_sidebar">
                <div className="sidebar_header">
                  <p>
                    Đơn hàng (<span>{count1()}</span> sản phẩm ){" "}
                  </p>
                  <div className="order_sumary">
                    <div className="order_items active">{showOrder()}</div>
                    <div className="flex" style={{ marginTop: "1rem" }}>
                      <span>Tạm tính</span>
                      <span>
                        {cart.total ? cart.total.toLocaleString() : 0}₫
                      </span>
                    </div>
                    <div className="shipping-fee flex">
                      <span>Phí vận chuyển</span>
                      <span>30.000đ</span>
                    </div>
                    <div className="total_sidebar flex">
                      <span>Tổng cộng</span>
                      <span>
                        {cart.total
                          ? (cart.total + 30000).toLocaleString()
                          : "30.000"}
                        ₫
                      </span>
                    </div>
                    <div className="ordersidebar_bottom flex">
                      <span>
                        <Link style={{ color: "#2a9dcc" }} to="/cart">
                          <i className="fas fa-angle-left"></i>Quay về giỏ hàng
                        </Link>
                      </span>
                      <button type="submit">Đặt hàng</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_hidden">
              <div className="ordersidebar_bottom flex">
                <span>
                  <Link style={{ color: "#2a9dcc" }} to="/cart">
                    <i className="fas fa-angle-left"></i>Quay về giỏ hàng
                  </Link>
                </span>
                <button type="submit">Đặt hàng</button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CheckoutPage;
