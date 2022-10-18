import * as userType from "../types/userTypes";
const initialState = {
  width:0
};
function imgReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_WIDTH":
      return {...state, width:action.payload}
    default:
      return state;
  }
}
export default imgReducer;
