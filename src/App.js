import logo from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import HomePage from  './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Portfolio from './pages/Portfolio'
import Portfolios from './pages/Portfolios'
import Stocks from './pages/Stocks'
import Stock from './pages/Stock'
import NavBar from  './components/nav.js'
import MainJumbo from './components/main_jumbo'
import Footer from './components/footer'
import TickerItem from './components/ticker_item'
import UserPage from './pages/User';


function App() {
 
  return (
    <div className='container'>
    <Router>
      <NavBar/>
      <Route exact path='/' component={HomePage}/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
      <Route path='/dashboard' component={UserPage}/>
      <Route path='/portfolio/:id' component={Portfolio}/>
      <Route path='/stocks' component={Stocks}/>
      <Route path='/portfolios' component={Portfolios}/>
      <Route path='/stock/:ticker' component={Stock}/>
    <Footer/>
    </Router>
    </div>
  );
}

export default App;
