import * as userType from "../types/userTypes";
const initialState = {
  userInfo: {},
  isLoading: false,
};
function userReducer(state = initialState, action) {
  switch (action.type) {
    case userType.AUTO_LOGIN:
      return {...state, userInfo:action.payload}
    case userType.REGISTER_USER:
      return { ...state, isLoading: true };
    case userType.REGISTER_USER_SUCCESS:
      return { ...state, userInfo: action.payload, isLoading: false };
    case userType.REGISTER_USER_FAIL:
      return { ...state, userInfo: action.payload, isLoading: false };
    case userType.LOGIN_USER:
      return { ...state, isLoading: true };
    case userType.LOGIN_USER_SUCCESS:
      return { ...state, userInfo: action.payload, isLoading: false };
    case userType.LOGIN_USER_FAIL:
      return { ...state, userInfo: action.payload, isLoading: false };
    case userType.LOGOUT_USER:
      return { ...state, userInfo: {} };
    default:
      return state;
  }
}
export default userReducer;
