import * as modalType from "../types/modalType";
const initialState = {
  isModal1: false,
  isModal2: false,
  id: "",
  url: "",
  name: "",
  price: "",
  type: "",
  isModalAddProduct: false,
  isModalFixProduct: false,
};
function modalReducer(state = initialState, action) {
  switch (action.type) {
    case modalType.SHOW_MODAL1:
      const { id, url, name, price, type } = action.payload;
      return {
        ...state,
        isModal1: true,
        id: id,
        url: url,
        name: name,
        price: price,
        type: type,
      };
    case modalType.SHOW_MODAL2:
      return { ...state, isModal2: true, isModal1: false };
    case modalType.HIDE_MODAL1:
      return { ...state, isModal1: false };
    case modalType.HIDE_MODAL2:
      return { ...state, isModal1: false, isModal2: false };

    case modalType.SHOW_MODAL_ADD_PRODUCT:
      return {
        ...state,
        isModalAddProduct: true,
      };
    case modalType.HIDE_MODAL_ADD_PRODUCT:
      return { ...state, isModalAddProduct: false };
    case modalType.SHOW_MODAL_FIX_PRODUCT:
      return {
        ...state,
        isModalFixProduct: true,
        id: action.payload.id,
        url: action.payload.url,
        name: action.payload.name,
        price: action.payload.price,
      };
    case modalType.HIDE_MODAL_FIX_PRODUCT:
      return { ...state, isModalFixProduct: false };
    default:
      return state;
  }
}
export default modalReducer;
