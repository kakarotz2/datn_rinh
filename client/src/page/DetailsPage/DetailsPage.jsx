import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Select } from 'antd';
import itemservice1 from '../../img/item_service1.png';
import itemservice2 from '../../img/item_service2.png';
import itemservice3 from '../../img/item_service3.png';
import itemservice4 from '../../img/item_service4.png';
import ReactImageMagnify from 'react-image-magnify';
import * as cartAction from '../../action/cart.action';
import * as modalAction from '../../action/modal.action';
import 'antd/dist/antd.css';
import './details.css';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
function DetailsPage(props) {
    const dispatch = useDispatch();
    const [valueInput, setValueInput] = useState(1);
    useEffect(() => {
        window.scrollTo(0, 0);
        const btnNextSmall = document.querySelector('.btn-next-small');
        const btnPreSmall = document.querySelector('.btn-pre-small');
        const listItemsSmall = document.querySelector('.img-small-center');
        function scroll() {
            let i = 0;
            btnNextSmall.addEventListener('click', () => {
                let width = document.querySelector('.img-small-item').clientWidth;
                i++;
                if (i > 2) {
                    i = 0;
                }
                listItemsSmall.style.transform = 'translateX(' + -i * width + 'px)';
            });
            btnPreSmall.addEventListener('click', () => {
                let width = document.querySelector('.img-small-item').clientWidth;
                i--;
                if (i < 0) {
                    i = 2;
                }
                listItemsSmall.style.transform = 'translateX(' + -i * width + 'px)';
            });
        }
        scroll();
        var imgArr = [...document.querySelectorAll('.img-small-item img')];
        imgArr.forEach((item) => {
            item.addEventListener('click', () => {
                imgArr.forEach((item) => {
                    item.classList.remove('img-active');
                });
                item.classList.add('img-active');
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
    const [img_big, setImg_big] = useState('');
    const showimgsmall = () => {
        let result;
        var arr = [
            item.url,
            'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://images.pexels.com/photos/719396/pexels-photo-719396.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
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
    const [errAmount, setErrAmount] = useState('');
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
            setErrAmount('S??? l?????ng ph???i l???n h???n 1');
        } else {
            dispatch(modalAction.showModal1(id, item.url, item.name, item.price, item.type));
            dispatch(cartAction.addToCart(id, item.url, item.name, item.price, Number(valueInput), size, item.type));
            dispatch(modalAction.showModal2());
            setErrAmount('');
        }
    };
    return (
        <div>
            <Header />
            <div className="details_page">
                <div className="details-title">
                    <div className="container">
                        Trang ch??? {'>'} <span>{item.name}</span>
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
                                            alt: 'Wristwatch by Ted Baker London',
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
                                            enlargedImageContainerClassName: 'img-big',
                                        },
                                        isHintEnabled: true,
                                        shouldHideHintAfterFirstActivation: false,
                                        enlargedImagePosition: 'beside',
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
                            <p className="rev-price">{item.price ? item.price.toLocaleString() : ''}???</p>
                            <div className="more-product">
                                ???????c k??? th???a nh???ng chi ti???t c???a nh???ng ????i Chuck 70 ????nh ????m <span>{item.name}</span>{' '}
                                c??ng ???????c l??m t??? ch???t li???u v???i Canvas nh??ng k??? thu???t d???t ho??n h???o khi???n m???t gi??y ?????p nh??
                                m???t b???c tranh v???a b???t m???t v???a t???o ra s??? ??m s??t cho ????i ch??n ng?????i d??ng.
                            </div>
                            <div className="promotion">
                                <div className="promotion-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>T???ng th??m Tote bag + Freeship v???i ????n h??ng t??? 3.000.000??</span>
                                </div>
                                <div className="promotion-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>T???ng th??m Tote bag + Freeship v???i ????n h??ng t??? 3.000.000??</span>
                                </div>
                                <div className="promotion-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>T???ng th??m Tote bag + Freeship v???i ????n h??ng t??? 3.000.000??</span>
                                </div>
                                <div className="promotion-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>T???ng th??m Tote bag + Freeship v???i ????n h??ng t??? 3.000.000??</span>
                                </div>
                            </div>
                            {item.type !== 'accessories' ? (
                                <div className="size">
                                    <span style={{ fontSize: '1.1rem', marginRight: '0.9rem' }}>K??ch th?????c</span>
                                    <Select
                                        defaultValue="35"
                                        style={{ width: 150, textAlign: 'center' }}
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
                                ''
                            )}
                            <div className="amount">
                                <p
                                    style={{
                                        fontSize: '1rem',
                                        marginBottom: '0.5rem',
                                        marginTop: '1rem',
                                    }}
                                >
                                    S??? l?????ng :
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
                            <p style={{ color: 'red' }}>{errAmount}</p>
                            <div className="buy">
                                <button className="btn-buynow" onClick={buyNow}>
                                    <p>mua ngay</p>
                                    <span>Giao h??ng COD t???n n??i</span>
                                </button>
                                <button className="btn-call">
                                    <p>G???i ?????t h??ng</p>
                                    <span>Vui l??ng g???i 012345678</span>
                                </button>
                            </div>
                        </div>
                        {/* End reviews */}
                        <div className="description">
                            <p className="tab_title">m?? t??? s???n ph???m</p>
                            <div className={showmore ? 'tab_content active' : 'tab_content'}>
                                <p>
                                    <strong>th??ng tin s???n ph???m</strong>
                                </p>
                                <table className="tab_table">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>Th????ng hi???u</td>
                                            <td>Converse</td>
                                        </tr>
                                        <tr>
                                            <td>Xu???t x??? th????ng hi???u</td>
                                            <td>M???</td>
                                        </tr>
                                        <tr>
                                            <td>S???n xu???t t???i</td>
                                            <td>Vi???t Nam</td>
                                        </tr>
                                        <tr>
                                            <td>Model</td>
                                            <td>Converse Chuck 70</td>
                                        </tr>
                                        <tr>
                                            <td>Ch???t li???u</td>
                                            <td>V???i canvas - Leather</td>
                                        </tr>
                                        <tr>
                                            <td>H?????ng d???n b???o qu???n</td>
                                            <td>
                                                <ul>
                                                    <li>
                                                        Tr??nh mang s???n ph???m khi tr???i m??a ho???c th???i ti???t x???u ????? ch??ng
                                                        kh??ng b??? ?????t d???n ?????n bong tr??c.
                                                    </li>
                                                    <li>
                                                        C???t gi??? s???n ph???m ??? n??i tho??ng m??t ????? gi??? g??n ch???t l?????ng c???a s???n
                                                        ph???m ??? m???c t???t nh???t.
                                                    </li>
                                                    <li>Lau ch??i s???n ph???m th?????ng xuy??n ????? tr??nh b???i.</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ch??? ????? b???o h??nh</td>
                                            <td>B???o h??nh ch??nh h??ng 1 th??ng theo phi???u b???o h??nh</td>
                                        </tr>
                                        <tr>
                                            <td>Quy tr??nh ????ng g??i</td>
                                            <td>
                                                <ul>
                                                    <li>Gi??y</li>
                                                    <li>H???p gi??y</li>
                                                    <li>T??i ?????ng Converse</li>
                                                    <li>Phi???u b???o h??nh ch??nh h??ng</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>
                                    <strong>M?? t??? s???n ph???m</strong>
                                </p>
                                <p className="description-name">
                                    <span>{item.name} </span> k??? th???a ???????c nh???ng ?????c ??i???m n???i b???t
                                </p>
                                <p>
                                    ???????c k??? th???a nh???ng chi ti???t c???a nh???ng ????i <span>{item.type}</span>70 ????nh ????m, l???n
                                    n??y <span>{item.category}</span> l???i ti???p t???c tung ra m???t phi??n b???n ng???t ng??o d??nh
                                    cho c??c c?? n??ng hi???n ?????i, y??u th??ch s??? ng???t ng??o m?? kh??ng qu?? l???, th??ch n???i b???t m??
                                    v???n ph???i th??? hi???n ???????c s??? tinh t???.
                                </p>
                                <p>
                                    <span>Chuck 70 Popped Colour</span> c??ng ???????c l??m t??? ch???t li???u v???i Canvas nh??ng k???
                                    thu???t d???t ho??n h???o khi???n m???t gi??y ?????p nh?? m???t b???c tranh v???a b???t m???t v???a t???o ra s??? ??m
                                    s??t cho ????i ch??n ng?????i d??ng.{' '}
                                </p>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/568800c-3.jpg?v=1599930418920"
                                    alt=""
                                />
                                <p>
                                    Ngo??i ra, ph???n ????? gi??y m??u tr???ng ng?? th???i th?????ng v???a tr??? trung v???a mang l???i m???t v???
                                    vintage, b??n ngo??i s???n ph???m ???????c ph??? s??n b??ng ????? gi??y c?? ???????c v??? ?????p ??ng ??? v?? sang
                                    ch???nh h??n. ??? phi??n b???n Popped Colour Chuck 70 v???a ???????c ra m???t, ph???n ????? ngo??i y???u t???
                                    k??? th???a ???????c truy???n th???ng c??n c?? nh???ng chi ti???t m???i nh?? ph???n ????? ???????c chia th??nh c??c
                                    layer kh??c nhau, v???a t???o ??i???m nh???n v???a t???o ra s??? kh??c bi???t cho m???t d??ng s???n ph???m
                                    m???i. Ph???n ????? gi??y ??? v??? tr?? g??t c??n ???????c ?????m th??m m???t l???p cao su l??n tr??n ????? gi??y t???o
                                    hi???u ???ng ch???ng th?? v??? v?? b???t m???t.{' '}
                                </p>
                                <div className={showmore ? 'show_more active' : 'show_more'}>
                                    <span onClick={() => setShowmore(true)} className="more-text">
                                        Xem ?????y ?????
                                    </span>
                                    <span onClick={() => setShowmore(false)} className="less-text">
                                        Thu g???n
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item-service">
                        <div className="wrap-item">
                            <img src={itemservice1} alt="" />
                            <div className="content_service">
                                <p>Giao h??ng si??u t???c</p>
                                <span>Nh???n h??ng trong 24-72h</span>
                            </div>
                        </div>
                        <div className="wrap-item">
                            <img src={itemservice2} alt="" />
                            <div className="content_service">
                                <p>Giao h??ng si??u t???c</p>
                                <span>Nh???n h??ng trong 24-72h</span>
                            </div>
                        </div>
                        <div className="wrap-item">
                            <img src={itemservice3} alt="" />
                            <div className="content_service">
                                <p>Giao h??ng si??u t???c</p>
                                <span>Nh???n h??ng trong 24-72h</span>
                            </div>
                        </div>
                        <div className="wrap-item">
                            <img src={itemservice4} alt="" />
                            <div className="content_service">
                                <p>Giao h??ng si??u t???c</p>
                                <span>Nh???n h??ng trong 24-72h</span>
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
