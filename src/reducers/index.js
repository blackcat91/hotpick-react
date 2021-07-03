import {combineReducers} from 'redux'



const INIT_STATE = {
    delivery : {
        delivery: {},
        type: 'delivery'
    },
    retrieveDirections : {
        response: null,
        travelMode: 'DRIVING',
        origin: '',
        destination: '',
        distance : 0,
        time: 0,
        size: '',
        sizes: {
            small: 'small' ,
            med : 'med',
            lrg:  'lrg'
        }
      },
      isLogged : {isLoggedIn: false, 
        userData : ''},
      getLocation: {lat:0, lng: 0 },
      pricing:  {
        price: 0
    }


}


// const appReducer = combineReducers({
//     isLogged,
//     getLocation,
//     retrieveDirections,
//     pricing,
//     delivery,
// });

const rootReducer = (state, action) => {
    if(action.type === 'LOG_OUT') {
        state = INIT_STATE
    }
   
}


export default rootReducer;