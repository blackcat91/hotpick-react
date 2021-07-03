import React from 'react'
import {Link} from 'react-router-dom'
import {getPrice, getTicker5SecondStream} from '../store/outside'



class TickerItem extends React.Component {

    constructor(props){
        super(props)
    
      
        this.propData = props.data
        this.getPrice = getPrice.bind(this)
       
        this.state = {
            price: 0
        }
    }

    async componentDidMount(){
        this.state.price = await this.getPrice(this.propData.ticker)
        
        this.forceUpdate()
    }

    
    async componentDidUpdate() {

    }

    render(){

        if(this.propData == undefined) {
            return (<div>Loading...</div>)
        }
        return (<Link  to={'/stock/'+this.propData.ticker}><div className='ticker-item'>
        <div className='tLeft'>
        <span>{this.propData.ticker}</span>
        <br></br>
        <span>{this.propData.company}</span>
        <br></br>
        <span>{(this.state == undefined || this.state.price == undefined) ? (<div></div>) : (<div>{this.state.price}</div>)}</span>
        </div>
       
        <div className='tRight'>
        <b><span className='overall'>Overall Score: </span></b>
        <span>{Math.floor(this.propData.overall * 100)}</span>
        </div>
        
    </div></Link>)
    }
}

export default TickerItem