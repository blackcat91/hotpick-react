import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { createPortfolio, getUser, verify, logout } from '../store/mongoCalls'
import Portfolio from './Portfolio'
import {scrollToTop, store} from '../store/index'
import {logOut} from '../actions/index'

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            verified: {},
            userInfo: {},
            userData : {},
            token: ''
        }
    }

    componentDidMount() {
        scrollToTop()
        
        this.state.verified = verify(store.getState().isLogged.token)
        this.state.verified.on('data', (res)=> {
            
            if(res.length == undefined){
                this.state.userInfo = res
                
                
           
            }
            else{
                this.state.error = new TextDecoder('utf-8').decode(res)
            }
            let data = this.state.userInfo
            let user = getUser(data._id)
            user.on('data', (response)=> {
                this.state.userData = response
                this.forceUpdate()
            })

           
        })
    }

    componentDidUpdate() {}

    logOut() {
       
        localStorage.removeItem('token')
        store.dispatch(logOut())
        this.props.history.push('/')
        this.forceUpdate()

}

    render() {


        return (
            this.state.userData.portfolios === undefined ? (<div className='user-page user-stocks'></div>) : (<div  className='user-page'>

            <section className='user-info'>
           
                <img height='200vh' src = 'https://clipartart.com/images/default-profile-picture-clipart-3.jpg'></img>
              
                <article>
                    <input type='text' value={this.state.userData.username} />
                    <p>{this.state.userData.email}</p>
                    <button>Change Password</button>
                </article>
            </section>
            <section className='user-stocks'>
                <Portfolio id = {this.state.userData.portfolios[0]} />
            </section>
            <section className='exit-buttons'>
                <button onClick={() => this.logOut()}>Sign Out</button>
                <button className='delete-acc'>Delete Account</button>
            </section>

        </div>)
        )
    }

}


export default withRouter(UserPage)