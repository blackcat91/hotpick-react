import React from 'react'
import moment from 'moment'
import CanvasJSReact from '../canvasjs-stock-1.3/canvasjs.stock.react';
import { getBars } from '../store/outside';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;



class StockChart extends React.Component {

  constructor(props) {
    super(props)
    this.getBars = getBars.bind(this)
    this.state = {
      barGen : []
    }
  }

    async componentDidMount() {
      var now = new Date(Date.now()).toISOString()
      var config = {
        start: moment().subtract(8, "days").format(),
        end: moment().subtract(30, "minutes").format(),
        timeframe: '5Min'}
      var bars = await this.getBars(this.props.ticker, config)
        
   
        this.state.barGen = bars
        this.forceUpdate()
        
      
    }


    componentDidUpdate() {
      
    }

    render(){
        const options = {
          theme: 'dark1',
            title: {
                text: this.props.ticker.toUpperCase() + " Stock Chart"
            },
            charts: [{
                data: [{
                  type: "candlestick",
                  dataPoints: this.state.barGen
               }]
            }],
            navigator: {
              
              slider: {
                minimum: new Date("2021-06-01"),
                maximum: new Date("2021-06-25")
              }
            },
            rangeSelector: {
              selectedRangeButtonIndex: 5,
              enabled: true,
              buttons: [
                {
                  label: "1 Min",
                  range: 1,
                  rangeType: "minute"
                },
                {
                  label: "5 Min",
                  range: 5,
                  rangeType: "minute"
                },
                {
                  label: "15 Min",
                  range: 15,
                  rangeType: "minute"
                },
                {
                  label: "30 Min",
                  range: 30,
                  rangeType: "minute"
                },
                {
                  label: "1Hour",
                  range: 1,
                  rangeType: "hour"
                },
                {
                  label: "4Hour",
                  range: 4,
                  rangeType: "hour"
                },
                {
                  label: "8Hour",
                  range: 8,
                  rangeType: "hour"
                },
                {
                  label: "1Week",
                  range: 1,
                  rangeType: "week"
                }
              ],
              
            }
          };
          const containerProps = {
            width: "100%",
            height: "70vh",
            margin: "auto"
          };
        
              return (
                <div className='stock-chart'>
                  <CanvasJSStockChart
          options={options}
          containerProps = {containerProps}
          onRef={ref => this.stockChart = ref}
        />
                </div>
              )
            
    }
}


export default StockChart