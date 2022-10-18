import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as cartAction from "../../action/cart.action";
import "./cart.css";
function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { cartList } = cart;
  const delCart = (id) => {
    dispatch(cartAction.deleteCart(id));
  };
  const showList = () => {
    let result = cartList.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <img src={item.url} alt="" />
          </td>
          <td>
            <p>{item.name}</p>
            {item.type === "accessories" ? (
              ""
            ) : (
              <span>Size : {item.size}</span>
            )}
            <br />
            <span className="block">{item.price.toLocaleString()}₫</span>
            <div className="del_btn">
              <i
                style={{ cursor: "pointer" }}
                className="fas fa-times"
                onClick={() => delCart(item.id)}
              ></i>
            </div>
          </td>
          <td className="none">{item.price.toLocaleString()}₫</td>
          <td className="btn_amount">
            <button
              onClick={() => {
                dispatch(cartAction.decreAmount(item.id));
              }}
            >
              -
            </button>
            <input type="number" disabled={true} value={item.amount} />
            <button
              onClick={() => {
                dispatch(cartAction.increAmount(item.id));
              }}
            >
              +
            </button>
          </td>
          <td className="none">
            {(item.price * item.amount).toLocaleString()}₫
          </td>
          <td className="none">
            <i
              style={{ cursor: "pointer" }}
              className="fas fa-times"
              onClick={() => delCart(item.id)}
            ></i>
          </td>
        </tr>
      );
    });
    return result;
  };
  return (
    <React.Fragment>
      <div className="cart_title">
        <div className="container">
          <p style={{ lineHeight: "3rem", margin: "0", fontSize: "1.1rem" }}>
            Trang chủ {`>`} Giỏ hàng
          </p>
        </div>
      </div>
      <div className="cart_page container">
        <h3>Giỏ hàng</h3>
        {cartList.length >=1 ? (
          <table className="cart_table tab_table">
            <thead>
              <tr>
                <td>Ảnh sản phẩm</td>
                <td>Tên sản phẩm</td>
                <td className="none">Đơn giá</td>
                <td>Số lượng</td>
                <td className="none">Thành tiền</td>
                <td className="none">Xóa</td>
              </tr>
            </thead>
            <tbody>{showList()}</tbody>
          </table>
        ) : (
          <p>Giỏ hàng trống</p>
        )}
        <p className="total">
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Tổng tiền :{cart.total.toLocaleString()}đ
          </span>
          <br />
          <button className="continue"><Link className="button_cart" to="/">tiếp tục mua hàng</Link></button>
          <button className="checkout"><Link className="button_cart" to="/checkout">Thực hiện thanh toán</Link></button>
        </p>
      </div>
    </React.Fragment>
  );
}

export default Cart;
