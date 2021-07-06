import {combineReducers} from 'redux'
import isLogged from './isLogged'


const INIT_STATE = {
   
      isLogged : {isLoggedIn: false,
        token: '', 
        userData : {}}


}


 const appReducer = combineReducers({
    isLogged,
//     getLocation,
//     retrieveDirections,
//     pricing,
//     delivery,
 });

const rootReducer = (state, action) => {
    if(action.type === 'LOG_OUT') {
        state = INIT_STATE
    }
   return appReducer(state, action)
}


export default rootReducer;