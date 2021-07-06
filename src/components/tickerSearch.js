import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { searchStocks } from '../store/mongoCalls';
import $ from 'jquery'

class TickerSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ticker: '',
            results: [],
            opacity: 0
        }
    }

    componentDidMount(){
        this.resetTicker()
    }


    componentDidUpdate() {
        if($('.searchResults').html() === '0000000000000000'){
            this.resetTicker()
        }
        

    }

    resetTicker(){
        this.setState({opacity: 0})
        this.setState({ticker: ''})
        this.setState({results : []})
    }


    async onChange(event) {
        if(event.target.value.length > 0) {
        
        this.state.ticker= event.target.value
        this.forceUpdate()
        let result = searchStocks(this.state.ticker)
        result.on('data', (res) => {
            
            this.state.opacity = 1
            this.setState({results : res})
        })
        result.on('done', (err, res) => {
            this.forceUpdate()
            console.log('Done')
        })
        }
        else {
            this.resetTicker()
        }
    }

    resultClick(ticker){
        this.resetTicker()
        this.props.history.push('/stock/' + ticker)
    }

    render() {

        return (<div>

<div className = 'tickerSearch'>
               <input placeholder='Enter a ticker' name='search' type='text' value={this.state.ticker}  onChange = {(event) => this.onChange(event)} />
               <div className='searchResults' style={{opacity: this.state.opacity}}>
                   {
                       
                   (this.state.results.length > 0) ? 
                   this.state.results.map((v, i) => {
                    
                       return (
                       <div className='result' key={v._id} onClick={() => this.resultClick(v.ticker)}>
                           <Link to ={'/stock/' + v.ticker}>
                           {v.ticker}
                           <br></br>
                           {v.company}
                           </Link>
                       </div>)
                   }) : (<div></div>)
                   }
               </div>
               </div>
        </div>)
    }
}

export default withRouter(TickerSearch)