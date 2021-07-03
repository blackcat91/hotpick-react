import logo from '../logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../App.css';
import NavBar from  '../components/nav.js'
import MainJumbo from '../components/main_jumbo'
import Footer from '../components/footer'
import TickerItem from '../components/ticker_item'
import React from 'react';
import { getTopTen } from '../store/mongoCalls'
import {withRouter} from 'react-router-dom'
import {Client} from 'iexjs'
import {TEST_TOKEN} from '../store/outside'

const iexClient =  new Client({api_token: TEST_TOKEN, version:'sandbox'})

class HomePage extends React.Component{
    
    constructor(props){
      super(props)
      this.topTen = getTopTen.bind(this)
      this.state = {
        topTen : this.topTen(),
        tickerItems: [],
        data : []
      }
    }

     componentDidMount() {
      this.state.topTen.on('data', (res) => {
        
        this.state.data = res
        
        
       
       
        console.log('done')
        

    })
    this.state.topTen.on('done', async (err, res) => {
      var i = 0;
      for(i; i<10; i++){
       
        this.state.tickerItems.push(<TickerItem key={this.state.data[i].ticker} data ={this.state.data[i]}/>)
      }
      console.log('Finished')
      this.forceUpdate()
        
    })
    }

    componentDidUpdate() {

      

    }

    render() {
      if(this.state.data === undefined || this.state.data === {} ){
        return (<div>Loading</div>)
      }
     else{
      return (
      
        <div className="App">
          <div className='content'>
          
          <MainJumbo />
          
            
          <div>
          {this.state.tickerItems}
          </div>
          
          
         
          </div>
          
          
        </div>
      );

     }
      
      }
     

    }
    

  export default HomePage;