import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Axios from 'axios';
import './accountpage.css';
import { useSelector } from 'react-redux';
function AccountPage(props) {
    const user = useSelector((state) => state.user);
    const [listOrder, setListOrder] = useState([]);
    useEffect(() => {
        Axios.get('/user/account')
            .then((data) => {
                setListOrder(data.data);
            })
            .catch((err) => console.log(err));
    }, []);
    const showOrder = () => {
        if (listOrder.length > 0) {
            let result = listOrder.map((item) => {
                return item.product.map((item2, index2) => {
                    return (
                        <tr key={index2}>
                            <td>{item2.name}</td>
                            <td>{item.createdAt.slice(0, 10)}</td>
                            <td>{item.address}</td>
                            <td>{(item2.price * item2.amount).toLocaleString()}₫</td>
                            <td>
                                {' '}
                                {item.status === 'processing' ? 'Đang lấy hàng' : ''}
                                {item.status === 'completed' ? 'Đã nhận hàng' : ''}
                                {item.status === 'refunded' ? 'Hoàn trả' : ''}
                                {item.status === 'cancelled' ? 'Đã hủy' : ''}
                            </td>
                            <td>
                                {' '}
                                {item.status === 'processing' ? 'Đang lấy hàng' : ''}
                                {item.status === 'completed' ? 'Đã nhận hàng' : ''}
                                {item.status === 'refunded' ? 'Hoàn trả' : ''}
                                {item.status === 'cancelled' ? 'Đã hủy' : ''}
                            </td>
                        </tr>
                    );
                });
            });
            return result;
        } else {
            return (
                <tr>
                    <td>Giỏ hàng trống</td>
                </tr>
            );
        }
    };
    return (
        <section>
            <Header />
            <div style={{ borderBottom: '1px solid #ebebeb' }}>
                <div className="container" style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '0.9rem' }}>Trang chủ {'>'} Trang khách hàng</p>
                </div>
            </div>
            <div className="container">
                <p
                    style={{
                        fontSize: '1.1rem',
                        textTransform: 'uppercase',
                        fontWeight: '640',
                    }}
                >
                    Trang khách hàng
                </p>
                <span style={{ fontWeight: '600' }}>
                    Xin chào,{' '}
                    <span style={{ fontWeight: '700' }}>
                        {user.userInfo.user ? user.userInfo.user.firstName + ' ' + user.userInfo.user.lastName : ''}
                    </span>
                </span>
            </div>
            <div className="container">
                <div className="my_account">
                    <div className="table_account">
                        <table>
                            <thead>
                                <tr>
                                    <th>Đơn hàng</th>
                                    <th>Ngày</th>
                                    <th>Địa chỉ</th>
                                    <th>Giá trị đơn hàng</th>
                                    <th>Tình trạng thanh toán</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>{showOrder()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default AccountPage;
