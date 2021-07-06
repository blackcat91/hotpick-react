import React from 'react'
import StockChart from '../components/stockChart'
import {withRouter} from 'react-router-dom'
import { getNewsStream, convertUInt8, getPrice} from '../store/outside'
import { getStock } from '../store/mongoCalls'
import CanvasJSReact from '../canvasjs-stock-1.3/canvasjs.stock.react';
import '../style/pages.css'
import { news } from '@alpacahq/alpaca-trade-api/lib/resources/polygon'
import AddStock from '../components/addStock'
import {store,  scrollToTop } from '../store'

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
        scrollToTop()
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
       
        return(<div className='stock'>
            {(store.getState().isLogged.token == '' || store.getState().isLogged.token== undefined )? (<div></div>) : (<AddStock ticker = {this.ticker}/>)}
            <div className='stock-data'>
        <div className='tLeft'>
        <div>
        <span style={{'fontFamily': 'Impact'}}>{data.ticker}</span>
        <span  style={{'fontFamily': 'Couurier', 'fontWeight': 'bold'}}>${data.price}</span>
        </div>
        <br></br>
        <span style={{'fontWeight': 'bold'}}>{data.company}</span>
        <br></br>
        
        </div>
        <div className='tMid'>
        <b><span style={{fontSize:'1em'}}>Overall Score: </span></b>
        <br></br>
        {Math.round(data.overall * 100)}
        </div>
        <div className='tRight'>
            <div className='scores'>
                <span>mScore: <span>{Math.round(data.momentum * 100)}</span></span>
            <br></br>
             <span>vScore:<span> {Math.round(data.value * 100)}</span></span>
             </div>
        
        </div>
        
    </div>
    <div className='ticker-graph'>
    <StockChart ticker ={this.props.match.params.ticker}/>
    </div>
   
        <div className='news'>

            {(this.state.recentNews.length == 0) ? (<div></div>) : (<div>
                {this.state.recentNews.map((v,i) => {
                    
                    return(<a href={'https://finance.yahoo.com/quote/'+ this.props.match.params.ticker } target='_blank'><div className='news-item'>

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