import axios from "axios";
import * as userType from "./../types/userTypes";
export const autologin=(id)=>{
  return (dispatch) => {
    try {
      axios
        .post("/user/autologin")
        .then((data) => {
          dispatch({
            type: userType.AUTO_LOGIN,
            payload: data.data,
          });
        });
    } catch (err) {
      return ;
    }
  };
}
export const register = (firstName, lastName, email, password) => {
  return (dispatch) => {
    try {
      axios
        .post("/user/register", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
        .then((data) => {
          dispatch({
            type: userType.REGISTER_USER_SUCCESS,
            payload: data.data,
          });
        });
    } catch (err) {
      dispatch({
        type: userType.REGISTER_USER_FAIL,
        payload: err,
      });
    }
  };
};
export const login = (email, password) => {
  return (dispatch) => {
    try {
      axios.post("/user/login", { email, password }).then(({ data }) => {
        dispatch({
          type: userType.LOGIN_USER_SUCCESS,
          payload: data,
        });
      });
    } catch (err) {
      dispatch({
        type: userType.LOGIN_USER_FAIL,
        payload: err,
      });
    }
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: userType.LOGOUT_USER,
    });
  };
};
