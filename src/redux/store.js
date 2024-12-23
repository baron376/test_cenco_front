import {createStore , combineReducers} from 'redux';
import generalInfo from './reducers/generalInfo'
const reducer = combineReducers({
    generalInfo
});
const store = createStore(reducer);
export default store;