import { combineReducers } from 'redux'
import userReducer from './user'
import modalReducer from './modal'
import cartReducer from './cart'
import imgReducer from './img'
const rootReducer = combineReducers({
    user:userReducer,
    modal:modalReducer,
    cart:cartReducer,
    img:imgReducer
})

export default rootReducer