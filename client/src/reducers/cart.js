import * as cartType from "../types/cartType";
const initialState = {
  cartList: [],
  total: 0,
};
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cartType.ADD_TO_CART:
      let cartItem = action.payload;
      let { id } = cartItem;
      let { cartList } = state;
      let index = cartList.findIndex((item) => item.id === id);
      if (index !== -1) {
        let newCartList = state.cartList;
        let newAmount = newCartList[index].amount + action.payload.amount;
        newCartList[index].amount = newAmount;
        let newTotal = 0;
        for (let i = 0; i < newCartList.length; i++) {
          newTotal += newCartList[i].price * newCartList[i].amount;
        }
        return {
          ...state,
          cartList: newCartList,
          total: newTotal,
        };
      } else {
        let newCart = cartList.concat(cartItem);
        let newTotal1 = 0;
        for (let i = 0; i < newCart.length; i++) {
          newTotal1 += newCart[i].price * newCart[i].amount;
        }
        return {
          ...state,
          cartList: newCart,
          total: newTotal1,
        };
      }
    //=================================
    case cartType.DECRE_AMOUNT:
      let idDecre = action.payload;
      var indexDecre = state.cartList.findIndex((item) => item.id === idDecre);
      var newDecre = state.cartList;
      const DecreAmount = newDecre[indexDecre].amount - 1;
      if (DecreAmount <= 1) {
        newDecre[indexDecre].amount = 1;
      } else {
        newDecre[indexDecre].amount = DecreAmount;
      }
      let newtotalDecre = 0;
      for (let i = 0; i < newDecre.length; i++) {
        newtotalDecre += newDecre[i].price * newDecre[i].amount;
      }
      return { ...state, cartList: newDecre, total: newtotalDecre };
    //========================================

    case cartType.INCRE_AMOUNT:
      let idIncre = action.payload;
      var indexIncre = state.cartList.findIndex((item) => item.id === idIncre);
      var newIncre = state.cartList;
      const IncreAmount = Number(newIncre[indexIncre].amount) + 1;
      newIncre[indexIncre].amount = IncreAmount;
      let newtotalIncre = 0;
      for (let i = 0; i < newIncre.length; i++) {
        newtotalIncre += newIncre[i].price * newIncre[i].amount;
      }
      return { ...state, cartList: newIncre, total: newtotalIncre };
    //DELETE
    case cartType.DELETE_CART:
      var delCart = state.cartList.filter((item) => item.id !== action.payload);
      var delTotal = 0;
      for (let i = 0; i < delCart.length; i++) {
        delTotal += delCart[i].price * delCart[i].amount;
      }
      return {...state,cartList:delCart,total:delTotal}
    case cartType.DELETE_ALL_CART:
      return {...state,cartList:[],total:0}
    default:
      return { ...state };
  }
}
export default cartReducer;
