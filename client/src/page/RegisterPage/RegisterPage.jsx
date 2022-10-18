import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import * as UserAction from '../../action/user.action'
import { useDispatch, useSelector } from 'react-redux'
import LoadingGif from '../../common/Loading'
import './register.css'
function RegisterPage(props) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  useEffect(() => {
    if(user.userInfo.user){
      props.history.goBack()
    }
  }, [user,props.history])
  return (
    <React.Fragment>
      {user.isLoading?<LoadingGif />:''}
      <Header />
      <div className="cart_title">
        <div className="container">
          <p style={{ lineHeight: "3rem", margin: "0", fontSize: "1.1rem" }}>
            Trang chủ {`>`} Đăng kí
          </p>
        </div>
      </div>
      <div className="container">
        <div className="register_page">
          <h3>ĐĂNG KÍ TÀI KHOẢN</h3>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email chưa được nhập";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Email không hợp lệ";
              }
              if (values.password.length < 3) {
                errors.password = "Mật khẩu tối thiểu 3 ký tự";
              }
              if (values.firstName.length < 2) {
                errors.firstName = "Họ bao gồm nhiều hơn 1 ký tự";
              }
              if (values.lastName.length < 2) {
                errors.lastName = "Tên bao gồm nhiều hơn 1 ký tự";
              }
              return errors;
            }}
            onSubmit={ (values) => {
              dispatch({type:"REGISTER_USER"})
              dispatch(UserAction.register(values.firstName,values.lastName,values.email,values.password));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form method="POST" action="/user/register" className="regis_form" onSubmit={handleSubmit}>
                <div className="field">
                  <p>Họ*</p>
                  <input
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                   <p style={{ color: "red" }}>
                    {errors.firstName && touched.firstName && errors.firstName}
                  </p>
                </div>
                <div className="field">
                  <p>Tên*</p>
                  <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p style={{ color: "red" }}>
                    {errors.lastName && touched.lastName && errors.lastName}
                  </p>
                </div>
                <div className="field">
                  <p>Email*</p>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p style={{ color: "red" }}>
                    {errors.email && touched.email && errors.email}
                    {user.userInfo.message?user.userInfo.message:''}
                  </p>
                </div>
                <div className="field">
                  <p>Mật khẩu*</p>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p style={{ color: "red" }}>
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
                <div className="btn_submit">
                  <button type="submit" >
                    Đăng kí
                  </button>
                  <Link className="link_sub" to="/">
                    Đăng nhập
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default RegisterPage;
