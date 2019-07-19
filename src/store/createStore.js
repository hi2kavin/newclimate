import {createStore,combineReducers} from 'redux'
import climateReducer from '../reducers/climateReducer'
import userReducer from '../reducers/userReducer'
export default ()=>{
    const store=createStore(
        combineReducers({
        climateReducer,
        userReducer,
        islog:false
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    return store
}