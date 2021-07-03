import React from 'react'
import { withRouter } from 'react-router-dom'
import { register } from '../store/mongoCalls'




class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            create: '', 
            confirm: '',
            error: ''
        }
    }

    componentDidMount() {

    }


    signUp(event) {
        event.preventDefault()
        if(this.state.create != this.state.confirm) {
            this.setState({error: 'Passwords are not the same'})
            return 0
        }
        this.setState({error: ''})
        let data = {email: this.state.email,username: this.state.username, password: this.state.confirm}
        let response = register(data)

        response.on('data', (res) => {
            if(res.length === undefined){
                this.props.history.push({'pathname': '/login', 'state': data})
                return 0
            }
            var dataString = new TextDecoder('utf-8').decode(res)
            console.log(dataString.length)
            this.setState({error : dataString})
           
        })
        response.on('done', (err, res) => {
            console.log('done')
        })

    }

 

    render() {



        return (
        
        
        <div className= 'register'>

            <div className='error'>{this.state.error}</div>
            <form>
                <label for='email'>Email</label>
                <input name='email' label='Email' type='text' value = {this.state.email} onChange={(event) => this.setState({email: event.target.value})} />
                <label for='username' >Username</label>
                <input name = 'username' label='username' type='text'  value = {this.state.username}  onChange={(event) => this.setState({username: event.target.value})}/>
                <label for='create'>Create Password</label>
                <input name='create' type='password'value = {this.state.create}  onChange={(event) => this.setState({create: event.target.value})}/>
                <label for='confirm'>Confirm Password</label>
                <input name='confirm' type='password'value = {this.state.confirm} onChange={(event) => this.setState({confirm: event.target.value})}/>

                <button onClick={(event) => this.signUp(event)}>

                Sign Up

                </button>
            </form>

        </div>)
    }
}


export default withRouter(Register)