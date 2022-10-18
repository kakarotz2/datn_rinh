import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as cartAction from "../../action/cart.action";
import "./modalcart.css";
function ModalCart() {
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch({ type: "HIDE_MODAL2" });
  };
  const cart = useSelector((state) => state.cart);
  const modal = useSelector((state) => state.modal);
  const { cartList } = cart;
  const show = () => {
    let result = cartList.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="modal_img">
              <img src={item.url} alt="" />
            </div>
            <div className="pro_info">
              <div className="name">{item.name}</div>
              {item.type === "accessories"}
              <button onClick={() => dispatch(cartAction.deleteCart(item.id))}>
                <i className="fas fa-times"></i>Xóa
              </button>
            </div>
          </td>
          <td style={{ fontWeight: "bold" }}>{item.price.toLocaleString()}₫</td>
          <td>
            <div className="amount">
              <button
                className="decre"
                onClick={() => dispatch(cartAction.decreAmount(item.id))}
              >
                <i className="fas fa-minus"></i>
              </button>
              <input
                style={{ marginBottom: 0 }}
                type="text"
                disabled={true}
                className="number"
                value={item.amount}
              />
              <button
                className="incre"
                onClick={() => dispatch(cartAction.increAmount(item.id))}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </td>
          <td style={{ fontWeight: "bold" }}>
            {(item.price * item.amount).toLocaleString()}₫
          </td>
        </tr>
      );
    });
    return result;
  };
  const count1 = () => {
    let result = 0;
    cartList.forEach((item) => {
      result += item.amount;
    });
    return result;
  };
  const showItem = () => {
    let result = cartList.map((item, index) => {
      return (
        <div className="modal_top_item" key={index}>
          <div className="modal_top_img">
            <img src={item.url} alt="" />
          </div>
          <div className="modal_top_right">
            <p>{item.name}</p>
            <span>{item.price.toLocaleString()}₫</span>
          </div>
        </div>
      );
    });
    return result;
  };
  return (
    <div>
      <Modal
        onCancel={handleCancel}
        style={{ padding: 0 }}
        visible={true}
        footer={null}
        className="cartmodal"
        width={1000}
      >
        <div className="modal_top">
          <div className="modal_top_title">
            <i className="far fa-check-circle"></i>
            <span>Thêm giỏ hàng thành công</span>
          </div>
          <div className="modal_top_list">{showItem()}</div>
          <div className="btn_modal_top">
            <button type="" onClick={handleCancel}>Tiếp tục mua hàng</button>
            <button>
              <Link
              onClick={handleCancel}
                to="/checkout"
                style={{
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Tiến hành thanh toán
                <i className="fas fa-angle-double-right"></i>
              </Link>
            </button>
          </div>
        </div>
        <div className="modal_normal">
          <p className="modal_title">
            <i className="far fa-check-circle"></i>
            Bạn đã thêm
            <span style={{ color: "#e4ca19" }}>
              [ <span>{modal.name}</span> /{" "}
              {cartList.length > 0 ? (
                <span>Size {cartList[cartList.length - 1].size} ]</span>
              ) : (
                ""
              )}
            </span>
            vào giỏ hàng thành công !
          </p>
          <div className="modal_info">
            <p>
              <Link
                to="/cart"
                style={{ color: "#000", fontSize: "1rem", fontWeight: "bold" }}
              >
                Giỏ hàng của bạn có <span>{count1()}</span> sản phẩm{" "}
                <i className="fas fa-caret-right"></i>
              </Link>
            </p>
            <div className="modal_table">
              <table>
                <thead>
                  <tr>
                    <td>Sản phẩm</td>
                    <td>Đơn giá</td>
                    <td>Số lượng</td>
                    <td>Thành tiền</td>
                  </tr>
                </thead>
                <tbody>{show()}</tbody>
              </table>
            </div>
          </div>
          <p className="total_price">
            Tổng tiền thanh toán: <span>{cart.total.toLocaleString()}₫</span>
          </p>
          <div className="btn_access">
            <button onClick={handleCancel}>
                Tiếp tục mua hàng
            </button>
            <button>
              <Link  onClick={handleCancel} className="link_btn" to="/checkout">
                Thực hiện thanh toán
              </Link>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCart;
