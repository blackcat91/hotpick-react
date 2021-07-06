import React from 'react'
import TickerItem from '../components/ticker_item'
import {withRouter} from 'react-router-dom'
import { getPortfolio, getStockList } from '../store/mongoCalls'
import '../style/pages.css'

class Portfolio extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data: {},
            heat: 0,
            stocks: []
        }
    }

    componentDidMount(){
        var p
        if(this.props.match.params.id){
            p = getPortfolio(this.props.match.params.id)
        }
        else{
            p = getPortfolio(this.props.id)
        }
        
        p.on('data', (res)=> {
            this.state.data = res
           
        })
        p.on('done', (err, res) => {
            let stockData = getStockList({stocks: this.state.data.stocks})
            stockData.on('data', (resp)=> {
                this.state.stocks = resp
                var i
                var total = 0
                for(i=0; i < this.state.stocks.length ; i++){
                    total += this.state.stocks[i].overall
                }
                this.state.heat = Math.round((total / this.state.stocks.length) * 100)
            })
            stockData.on('done', (erro, resp) => {
                this.forceUpdate()
            })
        })
    }

    render(){
        var i;
     
        return(<div>
            {(this.state === undefined || this.state.data.portfolio_name === undefined) ? (<div></div>) : (<div>
                <div className='portfolioInfo'>
            <span>{this.state.data.portfolio_name}</span>
            <div className='heatScore'>
            <span>Heat Score: </span>
            
                {(this.state.stocks.length == 0) ? (<span>0</span>) : (<span style={{'color': 'rgb(247, 55, 24)'}}>

                {this.state.heat}
            </span>)}
            </div>
            
            </div>
            <div className='portfolio'>
              {this.state.stocks.length > 0 ? (<div>
                  {this.state.stocks.map((v,i) => {
                      return (<TickerItem key={v.ticker} data = {v} />)
                  })}
              </div>) : null}
            </div>
            </div>)}
        </div>)
    }
}

export default withRouter(Portfolio)