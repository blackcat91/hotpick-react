import logo from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './style/index.css';
import './style/App.css';
import './style/pages.css';
import './style/components.css';
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
  document.title = 'HotPick: Find the hottest stocks on the market!'
  return (
    <div className='container'>
    <Router>
      <NavBar/>
      
      <Route exact path='/' component={HomePage}/>
      <Route path='/stock/:ticker' component={Stock}/>
      <Route path='/stocks' component={Stocks}/>
      <Route path='/dashboard' component={UserPage}/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
      <Footer/>
      {/*}
      
      
      <Route path='/portfolio/:id' component={Portfolio}/>
      
      <Route path='/portfolios' component={Portfolios}/>
      
    
    {*/}
    </Router>
    </div>
  );
}

export default App;
