import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import * as UserAction from "../../action/user.action";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../common/Loading";
function LoginPage(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.userInfo.user) {
      props.history.goBack();
    } else {
      return;
    }
  }, [user,props.history]);
  return (
    <React.Fragment>
      {user.isLoading ? <Loading /> : ""}
      <Header />
      <div className="cart_title">
        <div className="container">
          <p style={{ lineHeight: "3rem", margin: "0", fontSize: "1.1rem" }}>
            Trang chủ {`>`} Đăng nhập
          </p>
        </div>
      </div>
      <div className="container">
        <div className="register_page">
          <h3>ĐĂNG NHẬP TÀI KHOẢN</h3>
          <Formik
            initialValues={{
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
              return errors;
            }}
            onSubmit={(values) => {
              dispatch({ type: "LOGIN_USER" });
              dispatch(UserAction.login(values.email, values.password));
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
              <form
                method="POST"
                action="/user/login"
                className="login_form"
                onSubmit={handleSubmit}
              >
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
                    {user.userInfo.message ? user.userInfo.message : ""}
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
                  <button type="submit">Đăng nhập</button>
                  <Link className="link_sub" to="/register">
                    Đăng kí
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

export default LoginPage;
