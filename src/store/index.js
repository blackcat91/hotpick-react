import {createStore} from 'redux'
import rootReducer from '../reducers'

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export const scrollToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}