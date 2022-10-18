import React, { useState } from "react";
import "antd/dist/antd.css";
import { Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  MergeCellsOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./admin.css";
import { Link, Redirect } from "react-router-dom";
import ModalAddProduct from "../../components/AdminComponents/ModalAddProduct";
import ModalFixProduct from "../../components/AdminComponents/ModalFixProduct";
import * as userAction from '../../action/user.action'
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie'
const { SubMenu } = Menu;
function AdminPage({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [imgClick, setImgClick] = useState(false);
  const dispatch = useDispatch()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setImgClick(!imgClick);
  };
  const logout=()=>{
    dispatch(userAction.logout())
    setRedirect(true)
    Cookies.remove("token");
    Cookies.remove('userId');
  }
  const [redirect, setRedirect] = useState(false)
  return (
    <div className="dashboard">
      {redirect?<Redirect to="/" />:''}
      <ModalAddProduct />
      <ModalFixProduct />
      <div
        style={{
          height: "100vh",
          position: "relative",
        }}
      >
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <div className={!imgClick ? "dashboard_img active" : "dashboard_img"}>
            <Link to='/'><img
              src="//bizweb.dktcdn.net/100/347/923/themes/742041/assets/logo.png?1604681126587"
              alt=""
            /></Link>
          </div>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/admin">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/admin/user">Tài khoản người dùng</Link>
          </Menu.Item>
          <Menu.Item icon={<ShoppingCartOutlined />}>
            <Link to="/admin/order">Đơn hàng</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<MergeCellsOutlined />} title="Sản phẩm">
            <Menu.Item key="1000">
              <Link to="/admin/new">Sản phẩm mới</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/admin/converse">Converse</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/admin/vans">Vans</Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to="/admin/accessories">Accessories</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <div className="dashboard_right">
        <div className="dashboard_header">
          <Button
            className="btn_dashboard"
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            )}
          </Button>
          <div className="header_right">
            <div className="action_admin">
              <i
                style={{
                  lineHeight: "2rem",
                  marginLeft: "1rem",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
                className="far fa-user"
              ></i>
              <div className="logg">
                <button onClick={()=>logout()}><span>Đăng xuất</span></button>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AdminPage;
