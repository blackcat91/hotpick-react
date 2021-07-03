import React from 'react'
import StockChart from '../components/stockChart'
import {withRouter} from 'react-router-dom'
import { getNewsStream, convertUInt8, getPrice} from '../store/outside'
import { getStock } from '../store/mongoCalls'
import CanvasJSReact from '../canvasjs-stock-1.3/canvasjs.stock.react';
import './pages.css'
import { news } from '@alpacahq/alpaca-trade-api/lib/resources/polygon'
import AddStock from '../components/addStock'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
class Stock extends React.Component{

    constructor(props){
        super(props)
        
        this.getNews = getNewsStream.bind(this)
        this.ticker = props.match.params.ticker
        this.getStock = getStock.bind(this)
        this.state={
            price : 0,
            news : this.getNews(this.ticker),
            stockStream: this.getStock(this.ticker),
            stock: {},
            data : {},
            recentNews : []
        }
    }

    async componentDidMount(){
        var stream = this.state.stream;
        let news = this.state.news;
        let stockStream = this.state.stockStream
        stockStream.on('data', async (res) => {
            console.log('Data Received')
           
            this.state.stock = res         
            this.state.stock.price = await getPrice(this.ticker)
           
            this.forceUpdate()
            
            
        })

        stockStream.on('err', (err) => {
            console.log(err.message)
        })

        stockStream.on('done', (err) => {
            if(!err){
                console.log('Closed Peacefully')
            }
            else{
                console.log(err)
            }
        })

        news.on('data', (res) => {
            
            this.state.recentNews = res
            // var string = JSON.stringify(dataString)
            // if(eval(JSON.parse(string))[0]){
            //     this.state.recentNews = eval(JSON.parse(string))[0]
            //     console.log(this.state.recentNews)
            // }
            // this.forceUpdate()
        })
        news.on('err', (err) => {
            console.log(err.message)
        })

        news.on('done', (err) => {
            if(!err){
                console.log('Closed Peacefully')
            }
            else{
                console.log(err)
            }
        })
    }

    async componentDidUpdate() {
       
        
        let price = await getPrice(this.ticker)
        if(this.state.stock.price == price) {
            return 0
        }
        this.state.stock.price = price
        this.forceUpdate()

    }

    
    render(){
        var data = this.state.stock
       
        return(<div>
            <AddStock ticker = {this.ticker}/>
            <div className='ticker-item'>
        <div className='tLeft'>
        <span>{data.ticker}</span>
        <br></br>
        <span>{data.company}</span>
        <br></br>
        <span>{data.price}</span>
        </div>
       
        <div className='tRight'>
            <div className='scores'>
                <span>Momentum Score: <span>{Math.round(data.momentum * 100)}</span></span>
            <br></br>
             <span>Value Score:<span> {Math.round(data.value * 100)}</span></span>
             </div>
        
        </div>
        
    </div>
    <div className='ticker-graph'>
    <StockChart ticker ={this.props.match.params.ticker}/>
    </div>
    <div className='oScore'>
    <b><span style={{fontSize:'2em'}}>Overall Score: {Math.round(data.overall * 100)}</span></b>
    </div>
        
        <div className='news'>

            {(this.state.recentNews.length == 0) ? (<div></div>) : (<div>
                {this.state.recentNews.map((v,i) => {
                    
                    return(<a href={'https://finance.yahoo.com/quote/'+ this.props.match.params.ticker}><div className='news-item'>

                        <h2>
                            {v.headline}
                        </h2>
                        <h3>{Date(v.datetime)}</h3>
                        <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F488994%2Fgetty-stock-market-data.jpg&f=1&nofb=1' width='50%' height='300px' />
                        <p>
                            {v.summary}
                            </p>

                            <h4>{v.source}</h4>
                    </div>
                    </a>)
                })}
            </div>)}

        </div>
        </div>)
    }
}

export default withRouter(Stock)