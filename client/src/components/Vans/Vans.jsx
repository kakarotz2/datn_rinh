import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import vans_logo1 from '../../img/vans_logo1.png';
import vans_logo2 from '../../img/vans_logo2.png';
import Product from '../Product/Product';
import './vans.scss';
import Axios from 'axios';
import { Spin } from 'antd';
function Vans() {
    const [vans_products, setVans_products] = useState([]);
    useEffect(() => {
        Axios.get('/api/vans').then((data) => {
            setVans_products(data.data);
        });
    }, []);
    const show1 = () => {
        if (vans_products.length > 0) {
            let result = Array.from(vans_products)
                .slice(0, 6)
                .map((item, index) => {
                    return (
                        <Product
                            type={item.type}
                            key={index}
                            name={item.name}
                            url={item.url}
                            id={item._id}
                            price={item.price}
                        />
                    );
                });
            return result;
        } else {
            return;
        }
    };
    const show2 = () => {
        if (vans_products.length > 0) {
            let result = Array.from(vans_products)
                .slice(6, 12)
                .map((item, index) => {
                    return (
                        <Product
                            type={item.type}
                            key={index}
                            name={item.name}
                            url={item.url}
                            id={item._id}
                            price={item.price}
                        />
                    );
                });
            return result;
        } else {
            return;
        }
    };
    return (
        <div className="awe-section-4">
            <div className="container">
                <div className="title">
                    <div className="tile-name">
                        <span>samsung</span>
                    </div>
                    <div className="btn_menu">
                        <ul>
                            <li>
                                <Link className="menu_item" to="/vans">
                                    xem tất cả
                                </Link>
                            </li>
                            <li>
                                <Link className="menu_item" to="/vans-classic">
                                    Classic
                                </Link>
                            </li>
                            <li>
                                <Link className="menu_item" to="/vans-authentic">
                                    Athentic
                                </Link>
                            </li>
                            <li>
                                <Link className="menu_item" to="/vans">
                                    Xem tất cả
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="btn-left btn-left-vans">
                        <i className="fas fa-chevron-left"></i>
                    </div>
                    <div className="btn-right btn-right-vans">
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div className="list_products vans">
                    {/* <div className="logo_product">
            <img src={vans_logo1} alt="" />
            <img src={vans_logo2} alt="" />
          </div> */}
                    <div className="owls owls_vans">
                        {/* Owl-item */}
                        {vans_products.length === 0 ? (
                            <div className="spin">
                                <Spin size="large" />
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="list_items list_items-vans">{show1()}</div>
                        <div className="list_items list_items-vans">{show2()}</div>
                        {/* End owl */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vans;
