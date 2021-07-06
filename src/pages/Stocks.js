import React from 'react'
import TickerItem from '../components/ticker_item'
import TickerSearch from '../components/tickerSearch'
import {withRouter} from 'react-router-dom'
import { scrollToTop } from '../store'
import {getStocks,searchStocks} from '../store/mongoCalls'
import '../style/pages.css'



class Stocks extends React.Component{

    constructor(props){
        super(props)
        this.getStocks = getStocks.bind(this)
        this.state={
            stocks: [],
            stockStream: {},
            tickerItems: [],
            paginate: {},
            pageNo: 1,
            back: [],
            forward: []
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
        scrollToTop()
       this.loadInitStocks()
    }


    paginate(direction) {
        
       
        
        
        if(direction == 'forward'){
            this.state.forward.push(this.state.stocks[this.state.stocks.length -1]._id)
            this.state.stockStream = this.getStocks({_id: this.state.forward[this.state.forward.length -1]})
        this.state.stockStream.on('data', (res)=> {
            this.state.stocks = {}
            console.log(res)
            this.setState({stocks: res})
            
        })
        
        this.state.stockStream.on('done', (err, res) => {
         
           this.forceUpdate()

        })
        }
        else if(direction =='back'){
            
            if(this.state.forward.length <= 2){
                this.loadInitStocks()
            }
            else {
                this.state.forward.pop()
                this.state.stockStream = this.getStocks({_id: this.state.forward[this.state.forward.length -1]})
                this.state.stockStream.on('data', (res)=> {
                console.log(res)
                this.setState({stocks: res})
            
        })
        
                this.state.stockStream.on('done', (err, res) => {
                    
                    this.forceUpdate()

        })
            }


        }
       

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
            <b style={{'color': 'gold'}}><label>Ticker:</label></b>
            <br></br>
               <input type='text' value={this.state.ticker}  onChange = {(event) => this.onChange(event)} />
             
               </div>
                {(this.state === undefined || this.state.tickerItems === [] || this.state.stocks.length < 1 ) ? (<div></div>) : (<div>
                    <div class='search-results'>
                    
                    {this.state.stocks.map((v, i) => {
                        return (<TickerItem key={v.ticker} data={v} />)
                    })}
                    </div>
                    <div className='paginate'>
                    <div className='back' onClick = {() => this.paginate('back')}> <b>Back</b> </div>
                    <div className='next' onClick={() => this.paginate('forward')} > <b>Next</b></div>
                </div>
                    
                    
                </div>)}
                
            </div>
            
        </div>)
    }
}

export default withRouter(Stocks)