import React from 'react'
import TickerItem from '../components/ticker_item'
import TickerSearch from '../components/tickerSearch'
import {withRouter} from 'react-router-dom'

import {getStocks,searchStocks} from '../store/mongoCalls'
import './pages.css'



class Stocks extends React.Component{

    constructor(props){
        super(props)
        this.getStocks = getStocks.bind(this)
        this.state={
            stocks: [],
            stockStream: {},
            tickerItems: [],
            paginate: {}
        }
    }

    loadInitStocks() {
        this.state.stockStream = this.getStocks()
        this.state.stockStream.on('data', async (res)=> {
            this.state.stocks = res
            this.back = this.state.stocks[0]._id
           
            
            
            
        })
        this.state.stockStream.on('done', (err, res) => {
            this.forceUpdate()
            console.log('Done')
        })

    }

    componentDidMount(){
      
       this.loadInitStocks()
    }


    paginate(id) {
        var ID = {_id : id}
        this.back = this.state.stocks[0]._id
        this.state.stockStream = this.getStocks(ID)
        this.state.stockStream.on('data', (res)=> {
            console.log(res)
            this.setState({stocks: res})
            
        })
        
        this.state.stockStream.on('done', (err, res) => {
         
           this.forceUpdate()

        })
       

    }


    async onChange(event) {
        if(event.target.value.length > 0) {
        
        this.state.ticker= event.target.value
        let result = searchStocks(this.state.ticker)
        result.on('data', (res) => {
            console.log(res)
            this.state.opacity = 0.9
            this.setState({stocks : res})
        })
        result.on('done', (err, res) => {
            this.forceUpdate()
            console.log('Done')
        })
        }
        else {
            this.setState({opacity: 0})
            this.setState({ticker: ''})
            this.loadInitStocks()
        }
    }

    render(){
       
        return(<div>
            
            <div className='portfolioStocks' key='stocks'>
            <div className = 'tickerSearch' key = 'search'>
               <input type='text' value={this.state.ticker}  onChange = {(event) => this.onChange(event)} />
             
               </div>
                {(this.state === undefined || this.state.tickerItems === [] || this.state.stocks.length < 1 ) ? (<div></div>) : (<div>
                    <div>
                    
                    {this.state.stocks.map((v, i) => {
                        return (<TickerItem key={v.ticker} data={v} />)
                    })}
                    </div>
                    <div className='pagenate'>
                    <div className='back' onClick = {() => this.paginate(this.back)}> Back </div>
                    <button className='next' onClick={() => this.paginate(this.state.stocks[this.state.stocks.length -1]._id)} > {}</button>
                </div>
                    
                    
                </div>)}
                
            </div>
            
        </div>)
    }
}

export default withRouter(Stocks)