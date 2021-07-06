import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import logo from '../images/HotPick.png'
import menu from '../images/menu.png' 
import { store } from '../store'
import {logout} from '../store/mongoCalls'
import '../style/components.css'
import TickerSearch from './tickerSearch'
import $ from 'jquery'
import { logIn, logOut } from '../actions'

class NavBar extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            className: 'nav_desktop',
           
            showNav: false
        };
    }

    componentWillMount() {
        
        try{
            
            let token = localStorage.getItem('token')
            store.dispatch(logIn({token}))
            this.forceUpdate()
        }
        catch (e){
            console.log('error')
            store.dispatch(logOut())
        }
        
    }

    showNavMobile() {
        let showNav = this.state.showNav
        if(!showNav){
            $('.nav-items').addClass('mobile-nav')
            $('.mobile-nav').fadeIn('slow')
         
            this.setState({showNav: true})
        }
        else {
            $('.mobile-nav').fadeOut()
            $('.nav-items').removeClass('mobile-nav')
           
            this.setState({showNav: false})

        }
        
    }

    logOut() {
       
                localStorage.removeItem('token')
                store.dispatch(logOut())
                this.props.history.push('/')
                
        
     }

    render() {
        return (
            <div id='nav' className={this.state.className}>
                <div className='logo'><Link  to ='/'><img  height = '100%' width='100%' src={logo}  /></Link></div>
                <div className='nav-ticker'><TickerSearch /></div>
                <img className='menu' src = {menu}height='70px' width='70px' onClick={() => this.showNavMobile()}/>
                <ul className='nav-items'>
                {(store.getState().isLogged.token == undefined || store.getState().isLogged.token == '') ? (<div></div>) : (<div><Link to ='/dashboard'><li>Dashboard</li></Link></div>)}
              <div> <Link to ='/stocks'><li>Stocks</li></Link></div>
                {(store.getState().isLogged.token == undefined || store.getState().isLogged.token == '') ? (<div><Link to='/login'>Login</Link></div>) : (<div onClick = {() => this.logOut()}>Logout</div>)}
                </ul>


            </div>)
    }
}

export default withRouter(NavBar)