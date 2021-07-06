import React from 'react'
import { login } from '../store/mongoCalls'
import {Link} from 'react-router-dom'
import { store } from '../store'
import {logIn} from '../actions/index'


class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...props.location.state,
            email: '',
            password: '',
            statusCode: 0,
            error: ''
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        console.log(token)

    }

    login(event) {
        event.preventDefault();
        this.setState({error: ''})
        let data = {email: this.state.email, password: this.state.password}
        let loginResponse = login(data)

        loginResponse.on('response', (res) => {
            
            this.setState({statusCode: res.statusCode})
            
            
            
        })
        loginResponse.on('data', (res)=> {
            let response  = new TextDecoder('utf-8').decode(res)
            console.log(response)
            if(this.state.statusCode != 200){
                this.setState({error: response})
            }
            else{
                localStorage.setItem('token', response)
                store.dispatch(logIn({token: response}))
                this.props.history.push('/')
            }
        })
        loginResponse.on('done', (err, res) => {
            if(!err) console.log('done')
        })
    }

    render() {



        return (
        
        
        <div className= 'login'>


            <form>
                <label for='email'>Email</label>
                <input name = 'email' type='text' value={this.state.email} onChange={event=> this.setState({email: event.target.value})}/>
                <label for='password'>Password</label>
                <input name='password' type='password' value={this.state.password} onChange={event=> this.setState({password: event.target.value})} />

                <button onClick ={event => this.login(event)}>

                Login

                </button>
            </form>

<br></br>
<div className='register-link'><span>Don't have an account? It only takes a moment to register!</span>
<br></br>
<Link to='/register'>Register</Link></div>

        </div>)
    }
}


export default Login