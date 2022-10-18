import * as cartType from "./../types/cartType";
export const addToCart = (id, url, name, price, amount, size, type) => {
  return (dispatch) => {
    dispatch({
      type: cartType.ADD_TO_CART,
      payload: { id, url, name, price, amount, size, type },
    });
  };
};
export const decreAmount = (id) => {
  return (dispatch) => {
    dispatch({ type: cartType.DECRE_AMOUNT, payload: id });
  };
};
export const increAmount = (id) => {
  return (dispatch) => {
    dispatch({ type: cartType.INCRE_AMOUNT, payload: id });
  };
};
export const deleteCart=(id)=>{
  return (dispatch)=>{
    dispatch({type:cartType.DELETE_CART,payload:id})
  }
}
export const deleteAll=()=>{
  return (dispatch)=>{
    dispatch({type:cartType.DELETE_ALL_CART})
  }
}