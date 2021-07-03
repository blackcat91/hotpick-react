import React from 'react'
import { addStock, getPortfolio, getUser, removeStock, verify } from '../store/mongoCalls'

class AddStock extends React.Component {
    constructor(props) {
        super(props)
        this.ticker = this.props.ticker
        this.state = {
            error: '',
            verified: {},
            userInfo: {},
            userData : {},
            token: '',
            addable: null,
            addClass: 'add-stock'
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
            user.on('data',async  (response)=> {
                this.state.userData = response
                let portfolios = this.state.userData.portfolios
                let p = this.getPortfolioData(portfolios[0])
                p.on('data', (resp) => {
                    if(resp.stocks.includes(this.ticker)){
                        this.state.addable = false
                        this.state.addClass = 'remove-stock'
                        this.forceUpdate()
                    }
                    else {
                        this.state.addable = true
                        this.state.addClass = 'add-stock'
                        this.forceUpdate()
                    }
                })
                this.forceUpdate()
            })

           
        })
        
    }

     getPortfolioData(portID) {
        let p = getPortfolio(portID)
        return p
    }

    componentDidUpdate() {}

    addOrRemove() {
        if(this.state.addable) {
            let add = addStock({pId: this.state.userData.portfolios[0], ticker: this.ticker})
            add.on('data', (res)=> {
                console.log(res)
            })
            add.on('done', (res) => {
                this.setState({addable: !this.state.addable, addClass: 'remove-stock'})
            })
        }
        else {
            let remove = removeStock({pId: this.state.userData.portfolios[0], ticker: this.ticker})
            remove.on('data', (res)=> {
                console.log(res)
            })
            remove.on('done', (res) => {
                this.setState({addable: !this.state.addable, addClass: 'add-stock'})
            })
        }
       
       
    }

    render() {

        return (<div className={this.state.addClass} onClick={()=> this.addOrRemove()}>
            {this.state.addable == null ?
             (<div>Loading..</div>) : 
            
            (<div>
                {(this.state.addable == true) ? (<div >Add</div>): (<div >Remove</div>)}
            </div>) }
            
        </div>)
    }
}


export default AddStock