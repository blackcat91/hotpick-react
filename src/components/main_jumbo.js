import React from 'react'
import {Link} from 'react-router-dom'
import { searchStocks } from '../store/mongoCalls';
import './components.css'
import TickerSearch from './tickerSearch';

class MainJumbo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            className: 'jumbo_desktop',
            ticker: '',
            results: [],
            opacity: 0

        };
    }

    componentWillMount() {

        return 1;
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
        return (
            <div>
              
            <div id='jumbo' className={this.state.className}>
               <p>These scores are evaluated with test data.<br></br> Please do not use as financial advice!</p>
                <TickerSearch />

            </div> 
            </div>
            
            )
               }}

export default MainJumbo