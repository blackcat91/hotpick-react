import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import logo from '../images/HotPick.png'
import {logout} from '../store/mongoCalls'
import './components.css'

class NavBar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            className: 'nav_desktop',
            token: ''
        };
    }

    componentWillMount() {
        try{
            
            this.state.token = localStorage.getItem('token')
            this.forceUpdate()
        }
        catch (e){
            console.log('error')
        }
        
    }

    logOut() {
       
                localStorage.removeItem('token')
                
                this.props.history.push('/')
                this.forceUpdate()
        
     }

    render() {
        return (
            <div id='nav' className={this.state.className}>
                <Link className='logo' to ='/'><img src={logo} height='175em' width='250em' /></Link>
                <ul className='nav-items'>
                <Link to ='/portfolios'><li>Portfolios</li></Link>
                <Link to ='/stocks'><li>Stocks</li></Link>
                {(this.state.token == undefined || this.state.token == '') ? (<div><Link to='/login'>Login</Link></div>) : (<div onClick = {() => this.logOut()}>Logout</div>)}
                </ul>


            </div>)
    }
}

export default withRouter(NavBar)