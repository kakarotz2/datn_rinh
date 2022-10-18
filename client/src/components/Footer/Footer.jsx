import React from "react";
import { Link } from "react-router-dom";
import owl1 from "../../img/owl-item1.png";
import owl2 from "../../img/owl-item2.png";
import owl3 from "../../img/owl-item3.png";
import owl4 from "../../img/owl-item4.png";
import foot from '../../img/foot.png'
import { BackTop } from 'antd';
import "./footer.css";
function Footer() {
  return (
    <div>
      <section className="section_service_end">
        <div className="container">
          <div className="owl-state">
            <div className="owl-item">
              <div className="owl-img">
                <img src={owl1} alt="" />
              </div>
              <div className="owl-content">
                <p>Dịch vụ hàng đầu</p>
                <span>Chất lượng dịch vụ được đặt lên hàng đầu</span>
              </div>
            </div>
            <div className="owl-item">
              <div className="owl-img">
                <img src={owl2} alt="" />
              </div>
              <div className="owl-content">
                <p>Dịch vụ hàng đầu</p>
                <span>Chất lượng dịch vụ được đặt lên hàng đầu</span>
              </div>
            </div>
            <div className="owl-item">
              <div className="owl-img">
                <img src={owl3} alt="" />
              </div>
              <div className="owl-content">
                <p>Dịch vụ hàng đầu</p>
                <span>Chất lượng dịch vụ được đặt lên hàng đầu</span>
              </div>
            </div>
            <div className="owl-item">
              <div className="owl-img">
                <img src={owl4} alt="" />
              </div>
              <div className="owl-content">
                <p>Dịch vụ hàng đầu</p>
                <span>Chất lượng dịch vụ được đặt lên hàng đầu</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer_end">
        <div className="container">
          <div className="foot-table">
            <div className="footer_cloumn">
              <p>giới thiệu</p>
              <ul>
                <li>
                  <Link className="footer_link" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/">
                    Sản phẩm
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer_cloumn">
              <p>chính sách</p>
              <ul>
                <li>
                  <Link className="footer_link" to="/">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/">
                    Chính sách vận chuyển
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/">
                    Chính sách đổi trả bảo hành
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/">
                    Quy định sử dụng
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer_cloumn">
              <p>hỗ trợ khách hàng</p>
              <ul>
                <li>
                  <Link className="footer_link" to="/">
                    Kiểm tra đơn hàng
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/login">
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/">
                    Đăng kí
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/cart">
                    Giỏ hàng
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer_cloumn">
              <p>
				Công ty TNHH One For All	</p>
              <ul>
                <li>
                  <Link className="footer_link" to="/">
                    MST:012344556
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/">
                    Địa chỉ: 18 Phố Viên - Đức Thắng - Hà Nội
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/">
                    Điện thoại: 0969.938.892
                  </Link>
                </li>
                <li>
                  <Link className="footer_link" to="/">
                    Email: abc@gmail.com
                  </Link>
                </li>
                <li>
                  <img src={foot} alt=""/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <p className="end">© 2022 KHMT K63 B</p>
      <BackTop className="scroll"><i className="fas fa-chevron-up"></i></BackTop>
    </div>
  );
}

export default Footer;
