const INIT_STATE = {
   
    isLogged : {isLoggedIn: false,
      token: '', 
      userData : {}}


}

const isLogged = (state = INIT_STATE, action) => {
    switch(action.type){
        case 'LOG_IN':
            state.isLoggedIn = true
            state.token = action.payload.token
            return state
        case 'USER_DATA':
            state.userData = action.payload.data
            return state
        default:
            return state
        
    }
}

export default isLogged