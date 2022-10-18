import * as modalType from "./../types/modalType";
export const showModal1 = (id, url, name, price, type) => {
  return (dispatch) => {
    dispatch({
      type: modalType.SHOW_MODAL1,
      payload: { id, url, name, price, type },
    });
  };
};
export const showModal2 = () => {
  return (dispatch) => {
    dispatch({ type: modalType.SHOW_MODAL2 });
  };
};
export const showModalAddProduct = () => {
  return (dispatch) => {
    dispatch({
      type: modalType.SHOW_MODAL_ADD_PRODUCT,
    });
  };
};
export const hideModalAddProduct = () => {
  return (dispatch) => {
    dispatch({ type: modalType.HIDE_MODAL_ADD_PRODUCT });
  };
};
export const showModalFixProduct = (id, name, url, price) => {
  return (dispatch) => {
    dispatch({
      type: modalType.SHOW_MODAL_FIX_PRODUCT,
      payload: {
        id: id,
        name: name,
        url: url,
        price: price,
      },
    });
  };
};
export const hideModalFixProduct = () => {
  return (dispatch) => {
    dispatch({ type: modalType.HIDE_MODAL_FIX_PRODUCT });
  };
};
