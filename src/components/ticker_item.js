import React from 'react'
import {Link} from 'react-router-dom'
import {getPrice, getTicker5SecondStream} from '../store/outside'
import $ from 'jquery';


class TickerItem extends React.Component {

    constructor(props){
        super(props)
    
      
        this.propData = props.data
        this.getPrice = getPrice.bind(this)
       this.tickerRef = React.createRef()
        this.state = {
            price: 0
        }
    }

    async componentDidMount(){
        let overall = (this.propData.overall * 100)
        if(overall > 65){
            $(this.tickerRef.current).css('background', 'red')
        }
        else if( overall >=50 && overall <= 65){
            $(this.tickerRef.current).css('background', 'green')
        }
        else {
            $(this.tickerRef.current).css('background', 'blue')
        }
       
  
        
        this.state.price = await this.getPrice(this.propData.ticker)
        
        this.forceUpdate()
    }

    
    async componentDidUpdate() {

    }

    render(){

        if(this.propData == undefined) {
            return (<div>Loading...</div>)
        }
        return (<Link key={this.propData.ticker} to={'/stock/'+this.propData.ticker}><div className='ticker-item' ref={this.tickerRef}>
        <div className='tInfo'>
            <div>
        <span>{this.propData.ticker}</span>
        <span>{(this.state == undefined || this.state.price == undefined) ? (<div></div>) : (<div>{this.state.price}</div>)}</span>
        </div>
        <span>{this.propData.company}</span>
      
        
        </div>
       
        <div className='overall'>
        
        <span>{Math.floor(this.propData.overall * 100)}</span>
        </div>
        
    </div></Link>)
    }
}

export default TickerItem