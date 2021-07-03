import React from 'react'
import {Link} from 'react-router-dom'
import { searchStocks } from '../store/mongoCalls';
import './components.css'


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

    }


    componentDidUpdate() {


    }
    async onChange(event) {
        if(event.target.value.length > 0) {
        
        this.state.ticker= event.target.value
        this.forceUpdate()
        let result = searchStocks(this.state.ticker)
        result.on('data', (res) => {
            console.log(res)
            this.state.opacity = 0.9
            this.setState({results : res})
        })
        result.on('done', (err, res) => {
            this.forceUpdate()
            console.log('Done')
        })
        }
        else {
            this.setState({opacity: 0})
            this.setState({ticker: ''})
            this.setState({results : []})
        }
    }

    render() {

        return (<div>

<div className = 'tickerSearch'>
               <input type='text' value={this.state.ticker}  onChange = {(event) => this.onChange(event)} />
               <div className='searchResults' style={{opacity: this.state.opacity}}>
                   {
                       
                   (this.state.results.length > 0) ? 
                   this.state.results.map((v, i) => {
                      console.log(v.ticker)
                       return (<div key={v._id}>
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

export default TickerSearch