import React from 'react'
import PortfolioInfo from '../components/portfolioInfo'
import { createPortfolio, getUser, verify } from '../store/mongoCalls'


class Portfolios extends React.Component{

    constructor(props){
        super(props)
        this.state={
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

    createPort() {
        createPortfolio({portfolio_name: 'Port Port', userID: this.state.userInfo._id})
    }

    render(){

      
        return (<div>
           
           {(this.state === undefined || this.state.userData.portfolios === undefined || this.state.userData == {}) ?
             
             (<div>
                 <br></br>
               <p>Nothing to see here  </p>
               <br></br>
             </div>)
            : (<div>
                
                {this.state.userData.portfolios.map((v,i) => {
                    return (<PortfolioInfo key ={v} id={v}/>)
                })}

            </div>) }
        </div>)
    }
}

export default Portfolios