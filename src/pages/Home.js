
import MainJumbo from '../components/main_jumbo'
import Footer from '../components/footer'
import TickerItem from '../components/ticker_item'
import React from 'react';
import { getTopTen } from '../store/mongoCalls'
import {withRouter} from 'react-router-dom'
import {Client} from 'iexjs'
import {TEST_TOKEN} from '../store/outside'
import { scrollToTop } from '../store';

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
       scrollToTop()
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
      
        <div className="home">

          
          <MainJumbo />
          

          <h1 style={{textAlign: 'center', color: 'white', fontSize: '4em'}}>Top Ten</h1>
            
          <div className='topTen'>
          {this.state.tickerItems}
          </div>
          
          
         
          
          
          
        </div>
      );

     }
      
      }
     

    }
    

  export default withRouter(HomePage);