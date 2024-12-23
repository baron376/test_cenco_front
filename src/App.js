//import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import RoutesAll from './route/RoutesAll'
import {Provider}  from 'react-redux';
import store from './redux/store';
function App() {
  require('dotenv').config()
  return (
    <Provider store = {store}>
    <BrowserRouter>
      <RoutesAll/>
    </BrowserRouter>
    </Provider>
  );
}
export default App;
