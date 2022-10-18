import React, { useEffect, useRef, useState } from "react";
import { Modal, Select } from "antd";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { showModal2 } from "../../action/modal.action";
import { addToCart } from "../../action/cart.action";
import logo from '../../img/converse_logo2.png'
function ModalComponent(props) {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch({ type: "HIDE_MODAL1" });
  };
  const [urlImage, setUrlImage] = useState(modal.url);
  const [size, setSize] = useState(35);
  const xRef = useRef(null)
  const [imgWidth, setImgWidth] = useState(0)
  useEffect(() => {
    setImgWidth(xRef.current.offsetWidth)
    let i = 0;
    const image = document.querySelectorAll(".image");
    const btn_Pre = document.querySelector(".btn_pre_img");
    const btn_Next = document.querySelector(".btn_next_img");
    const box_img = document.querySelector(".img_items");
    let img_width = xRef.current.offsetWidth;
    btn_Pre.addEventListener("click", () => {
      i--;
      if (i < 1) {
        i = 3;
      }
      box_img.style.transform = "translateX(" + -i * img_width + "px)";
    });
    btn_Next.addEventListener("click", () => {
      i++;
      if (i === 4) {
        i = 0;
      }
      box_img.style.transform = "translateX(" + -i * img_width + "px)";
    });
    image.forEach((item) => {
      item.addEventListener("click", () => {
        for (let i = 0; i < image.length; i++) {
          image[i].classList.remove("active");
        }
        item.classList.add("active");
        setUrlImage(item.getAttribute("src"));
      });
    });
  }, [xRef]);
  const handleChange = (e) => {
    setSize(e);
  };
  const [err, setErr] = useState('')
  const [amount, setAmount] = useState(1);
  const addCart = async () => {
    if(amount<=0){
      setErr("Số lượng mua phải lớn hơn hoặc bằng 1")
    }
    else{
      await dispatch(
        addToCart(modal.id, modal.url, modal.name, modal.price, amount, size,modal.type)
      );
      dispatch(showModal2());
    }
  };
  return (
    <div>
      <Modal
        visible={modal.isModal1}
        onCancel={handleCancel}
        className="box_modal"
        width={1000}
        footer={null}
      >
        <div className="modal_product">
          <div className="quick_view_left">
            <div className="quick_view_imgbig">
              <img src={urlImage} alt="" />
            </div>
            <div className="quick_view_imgsmall">
              <button className="btn_pre_img">
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className="box_small">
                <div className="img_items">
                  <div className="img_item" ref={xRef}>
                    <img
                      src={logo}
                      alt=""
                      className="image"
                    />
                  </div>
                  {/* <div className="img_item"  >
                    <img 
                      src="https://bizweb.dktcdn.net/thumb/medium/100/347/923/products/vn0a4bv5v77-3.png?v=1584794015000"
                      alt=""
                      className="image"
                    />
                  </div>
                  <div className="img_item">
                    <img
                      src="https://bizweb.dktcdn.net/thumb/medium/100/347/923/products/168603c-3.jpg?v=1603533967000"
                      alt=""
                      className="image"
                    />
                  </div>
                  <div className="img_item">
                    <img
                      src="https://bizweb.dktcdn.net/thumb/medium/100/347/923/products/164214-5.png?v=1580905720000"
                      alt=""
                      className="image"
                    />
                  </div>
                  <div className="img_item">
                    <img
                      src="https://bizweb.dktcdn.net/thumb/medium/100/347/923/products/168604c-3.jpg?v=1599920217000"
                      alt=""
                      className="image"
                    />
                  </div>
                  <div className="img_item">
                    <img
                      src="https://bizweb.dktcdn.net/thumb/medium/100/347/923/products/vn0a4u3bx00-8.jpg?v=1596295107000"
                      alt=""
                      className="image"
                    />
                  </div>
                  <div className="img_item">
                    <img
                      src="https://bizweb.dktcdn.net/thumb/medium/100/347/923/products/vn0a4bu6so0-1.jpg?v=1599327513000"
                      alt=""
                      className="image"
                    />
                  </div> */}
                </div>
              </div>
              <button className="btn_next_img">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="quick_view_right">
            <p>{modal.name}</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 0 }}>
              {modal.price.toLocaleString()}đ
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium perferendis doloribus assumenda! Hic sed pariatur
              provident nesciunt consectetur praesentium qui. Pariatur at rerum
              fugit inventore quas architecto dicta? Culpa, ea.
            </p>
            {modal.type==='accessories'?'':<div className="size">
              {/* <span style={{ fontSize: "1.1rem", marginRight: "0.9rem" }}>
                Kích thước
              </span>
              <Select
                value={size}
                style={{ width: 150, textAlign: "center" }}
                onChange={(e) => handleChange(e)}
              >
                <Select.Option value="35">số : 35</Select.Option>
                <Select.Option value="36">Size : 36</Select.Option>
                <Select.Option value="36.5">Size : 36.5</Select.Option>
                <Select.Option value="37">Size : 37</Select.Option>
                <Select.Option value="38">Size : 38</Select.Option>
                <Select.Option value="39">Size : 39</Select.Option>
                <Select.Option value="39.5">Size : 39.5</Select.Option>
              </Select> */}
            </div>}
            <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
              Số lượng :
            </p>
            <div className="amount">
              <button
                className="decre"
                onClick={() => {
                  Number(amount) <= 1
                    ? setAmount(1)
                    : setAmount(Number(amount) - 1);
                }}
              >
                <i className="fas fa-minus"></i>
              </button>
              <input
              style={{marginBottom:0}}
                type="number"
                className="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="incre"
                onClick={() => setAmount(Number(amount) + 1)}
              >
                <i className="fas fa-plus"></i>
              </button>
              <p style={{color:"red"}}>{err}</p>
            </div>
            <div className="buy">
              <button className="btn-buynow" onClick={addCart}>
                <span style={{ color: "#fff" }}>MUA NGAY</span>
                <br />
                <span>Giao hàng COD tận nơi</span>
              </button>
              <button className="btn-call">
                <span style={{ color: "#fff" }}>GỌI ĐẶT HÀNG</span>
                <br />
                <span>Vui lòng gọi 012345678</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalComponent;
