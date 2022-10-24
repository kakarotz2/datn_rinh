import React, { useEffect, useState } from 'react';
import './header.scss';
import {
    EnvironmentOutlined,
    PhoneOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import * as userAction from '../../action/user.action';
import Modal from '../Modal/Modal';
import ModalCart from '../ModalCart/ModalCart';
import * as cartAction from '../../action/cart.action';
function Header(props) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartList } = cart;
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const user = useSelector((state) => state.user);
    const { userInfo } = user;
    useEffect(() => {
        window.scrollTo(0, 0);
        if (Cookies.get('userId') !== '') {
            dispatch(userAction.autologin());
        }
        var navitem = document.querySelectorAll('.navitem');
        for (let i = 0; i < navitem.length; i++) {
            navitem[i].addEventListener('mouseover', () => {
                navitem[i].classList.add('active');
            });
            navitem[i].addEventListener('mouseout', () => {
                navitem[i].classList.remove('active');
            });
        }
    }, []);
    const [activeNav, setActiveNav] = useState(false);
    const showNav = () => {
        setActiveNav(true);
    };
    const hideNav = () => {
        setActiveNav(false);
    };
    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('userId');
        dispatch(userAction.logout());
    };
    const modal = useSelector((state) => state.modal);
    const count = () => {
        let result = 0;
        cartList.forEach((item) => {
            result += item.amount;
        });
        return result;
    };
    const showCartHover = () => {
        let result = cartList.map((item, index) => {
            return (
                <div className="list_item" key={index}>
                    <div className="img">
                        <img src={item.url} alt="" />
                    </div>
                    <div className="cart_item_info">
                        <p className="info_name">{item.name}</p>
                        <p className="info_price">{item.price.toLocaleString()}₫</p>
                        <div className="quantity">
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => dispatch(cartAction.decreAmount(item.id))}
                            >
                                -
                            </span>
                            <span>{item.amount}</span>
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => dispatch(cartAction.increAmount(item.id))}
                            >
                                +
                            </span>
                        </div>
                    </div>
                    <div className="delete_cart">
                        <i
                            style={{ cursor: 'pointer' }}
                            className="fas fa-times"
                            onClick={() => dispatch(cartAction.deleteCart(item.id))}
                        ></i>
                    </div>
                </div>
            );
        });
        return result;
    };
    return (
        <div>
            {modal.isModal1 ? <Modal /> : ''}
            {modal.isModal2 ? <ModalCart /> : ''}
            {userInfo.user && userInfo.user.role === 'admin' ? <Redirect to="/admin" /> : ''}
            {userInfo.user && userInfo.user.role === 'manager' ? <Redirect to="/admin" /> : ''}
            <nav className={activeNav ? 'navbar active' : ''}>
                <div className="background" onClick={hideNav}></div>
                <div className={activeNav ? 'navlist active' : 'navlist'}>
                    <div className="nav_img">
                        <Link to="/">
                            <img style={{ width: '16rem' }} src={logo} alt="" />
                        </Link>
                    </div>
                    <ul>
                        <li style={{ padding: '0.5rem 1rem' }}>
                            <Link className="nav_link" to="/">
                                home
                            </Link>
                        </li>
                        <li className={active1 ? 'nav_active' : ''}>
                            <div className="nav_item_flex">
                                <Link className="nav_link" to="/iphone" onClick={hideNav}>
                                    iPhone
                                </Link>
                                <PlusOutlined
                                    style={{ color: '#fff', fontSize: '1rem' }}
                                    onClick={() => {
                                        setActive1(!active1);
                                    }}
                                />
                            </div>
                            {/* <ul>
                                <li>
                                    <Link className="nav_link" to="/converse-chuck70s" onClick={hideNav}>
                                        iPhone Cu
                                    </Link>
                                </li>
                                <li>
                                    <Link className="nav_link" to="/converse-classic" onClick={hideNav}>
                                        iPhone moi
                                    </Link>
                                </li>
                            </ul> */}
                        </li>
                        <li className={active2 ? 'nav_active' : ''}>
                            <div className="nav_item_flex">
                                <Link className="nav_link" to="/samsung" onClick={hideNav}>
                                    SamSung
                                </Link>
                                <PlusOutlined
                                    style={{ color: '#fff', fontSize: '1rem' }}
                                    onClick={() => {
                                        setActive2(!active2);
                                    }}
                                />
                            </div>
                            {/* <ul>
                                <li>
                                    <Link className="nav_link" to="/vans-classic" onClick={hideNav}>
                                        SamSung cu
                                    </Link>
                                </li>
                                <li>
                                    <Link className="nav_link" to="/vans-authentic" onClick={hideNav}>
                                        SamSung moi
                                    </Link>
                                </li>
                                <li style={{ padding: 0, border: 'none' }}>
                                    <Link className="nav_link" to="/vans-authentic" onClick={hideNav}></Link>
                                </li>
                            </ul> */}
                        </li>
                        <li style={{ padding: '0.5rem 1rem' }}>
                            <Link className="nav_link" to="/accessories" onClick={hideNav}>
                                accessories
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <header className="header">
                <div className="topbar">
                    <div className="container">
                        <div className="account">
                            <div className="account_icon">
                                <div
                                    style={{ position: 'relative', cursor: 'pointer', color: '#000' }}
                                    to="/"
                                    className="acc link"
                                >
                                    <UserOutlined />
                                    <span>
                                        {userInfo && userInfo.user
                                            ? userInfo.user.firstName + ' ' + userInfo.user.lastName
                                            : 'Tài khoản'}
                                    </span>
                                    {!userInfo.user ? (
                                        <div className="btn_login">
                                            <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to="/login">
                                                <button className="btn_1">
                                                    <span>Đăng nhập</span>
                                                </button>
                                            </Link>
                                            <Link to="/register" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                                <button className="btn_2">
                                                    <span>Đăng kí</span>
                                                </button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="btn_login">
                                            <Link to="/account">
                                                <button className="btn_1" style={{ color: '#fff' }}>
                                                    Tài khoản
                                                </button>
                                            </Link>
                                            <button className="btn_2" onClick={() => logout()}>
                                                <span>Đăng xuất</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <Link to="/" className="link disnone" style={{ marginLeft: '1rem', color: '#000' }}>
                                    <EnvironmentOutlined />
                                    <span>Hệ thống cửa hàng</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mid-header ">
                    <div className="container">
                        <div className="layout">
                            <div className="icon_nav" onClick={showNav}>
                                <i className="fas fa-bars"></i>
                            </div>
                            <div className="logo">
                                <Link to="/">
                                    <img style={{ width: '16rem' }} src={logo} alt="" />
                                </Link>
                            </div>
                            <div className="search">
                                <form action="/search">
                                    <input type="text" placeholder="Tìm kiếm" name="query" />
                                    <span>
                                        <button className="btn_search" type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </span>
                                </form>
                            </div>
                            <div className="bg_cart">
                                <Link to="/" className="link">
                                    <div className="hotline">
                                        <PhoneOutlined className="icon" />
                                        <div className="info">
                                            <span>
                                                012345678
                                                <br />
                                                <small>Hotline</small>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <div className="link">
                                    <div className="btn_cart">
                                        <ShoppingCartOutlined className="icon" />
                                        <Link to="/cart" style={{ color: '#fff' }}>
                                            <div className="info">
                                                (<span>{count()}</span>)<span>Sản phẩm</span>
                                                <br />
                                                <small>Giỏ hàng</small>
                                            </div>
                                        </Link>
                                        <div className="cart_hover">
                                            {cartList.length > 0 ? (
                                                <div>
                                                    <div className="list_cart" id="scroll_cart">
                                                        {showCartHover()}
                                                    </div>
                                                    <div className="total_hover">
                                                        <span>Tổng tiền :</span>
                                                        <span>{cart.total.toLocaleString()}₫</span>
                                                    </div>
                                                    <div className="btn_cart_hover">
                                                        <button>
                                                            <Link className="link_check" to="/checkout">
                                                                Tiến hành thanh toán
                                                            </Link>
                                                        </button>
                                                        <button>
                                                            <Link className="link_check" to="/cart">
                                                                Đi đến giỏ hàng
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div style={{ width: '20rem', textAlign: 'center' }}>
                                                    <p
                                                        style={{
                                                            color: '#000000',
                                                            position: 'relative',
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        Không có sản phẩm nào trong giỏ hàng
                                                    </p>{' '}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="search search_full">
                            <form action="/search">
                                <input type="text" placeholder="Tìm kiếm" name="query" />
                                <span>
                                    <button style={{ cursor: 'pointer' }} className="btn_search" type="submit">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="wrap-main">
                    <div className="container">
                        <ul>
                            <li className="navitem first">
                                <div to="/" className="link">
                                    <i className="fas fa-bars"></i>
                                    <span>Danh mục sản phẩm</span>
                                </div>
                                <ul>
                                    <li>
                                        <Link className="link" to="/iphone">
                                            <span>iPhone</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="/vans">
                                            <span>SamSung</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link" to="/accessories">
                                            <span>Phụ kiện</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="navitem">
                                <Link to="/" className="link">
                                    <span className="style-span">Home</span>
                                    {/* <i className="fas fa-chevron-down"></i> */}
                                </Link>
                            </li>
                            <li className="navitem">
                                <Link to="/iphone" className="link">
                                    <span className="style-span">iPhone</span>
                                </Link>
                                {/* {<i style={{ color: '#fff', fontSize: '1.1rem' }} className="fas fa-chevron-down"></i>}
                                {
                                    <ul>
                                        <li>
                                            <Link className="link" to="/converse-chuck70s">
                                                <span>Chuck 70s</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="link" to="/converse-classic">
                                                <span>Classic</span>
                                            </Link>
                                        </li>
                                    </ul>
                                } */}
                            </li>
                            <li className="navitem">
                                <Link to="/samsung" className="link">
                                    <span className="style-span">SamSung</span>
                                </Link>
                                {/* {<i style={{ color: '#fff', fontSize: '1.1rem' }} className="fas fa-chevron-down"></i>}
                                {
                                    <ul>
                                        <li>
                                            <Link className="link" to="/vans-classic">
                                                <span>Classic</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="link" to="/vans-authentic">
                                                <span>Authentic</span>
                                            </Link>
                                        </li>
                                    </ul>
                                } */}
                            </li>
                            <li className="navitem">
                                <Link to="/accessories" className="link">
                                    <span className="style-span">Phụ kiện</span>
                                </Link>
                            </li>
                            <li className="navitem">
                                <Link to="/" className="link">
                                    <span className="style-span">về chúng tôi</span>
                                </Link>
                            </li>
                            <li className="navitem">
                                <Link to="/" className="link">
                                    <span className="style-span">Liên hệ</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
