import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { createPortfolio, getUser, verify, logout } from '../store/mongoCalls'

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
        this.state.token = localStorage.getItem('token')
        this.state.verified = verify(this.state.token)
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
       let logOutStream =  logout(this.state.token)
       logOutStream.on('data', (res) => {
           if(res == 'Logout Successful'){
               localStorage.removeItem('token')
               this.props.history.push('/')

           }
       })
    }

    render() {


        return (
            <div  className='user-page'>

                

            </div>
        )
    }

}


export default withRouter(UserPage)