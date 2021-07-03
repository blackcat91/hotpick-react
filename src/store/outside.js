import needle from 'needle'
import Alpaca from '@alpacahq/alpaca-trade-api'
import moment from 'moment'


/*
Any calls to outside api's or services we may need are built in here.
Data grabbed from alpaca or IEX have functions that we setup so that we can focus on styling components 
instead handling logic inside them



*/

var options = {
    headers: { 'Accept': 'text/event-stream' },
    json: true
  }



 

const ALPACA_URL = 'https://api.alpaca.markets'
const ALPACA_DOMAIN= 'api.alpaca.markets'
const ALPACA_KEY = 'AK800MFRCDVNA1VJP3PJ'
const ALPACA_SECRET = 'VjkqQrbMqajdeONvxSMP2rGbRNKTb2QJELwM6fHz'
var alpacaOptions = {
    headers : {"Access-Control-Allow-Origin": ALPACA_DOMAIN, "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, APCA-API-KEY-ID,APCA-API-SECRET-KEY",'APCA-API-KEY-ID': 'AK800MFRCDVNA1VJP3PJ', 'APCA-API-SECRET-KEY' : 'VjkqQrbMqajdeONvxSMP2rGbRNKTb2QJELwM6fHz'}
}

const IEX_SANDBOX = 'https://sandbox.iexapis.com'

const IEX_SSE_SANDBOX = 'https://sandbox-sse.iexapis.com'

export const TEST_TOKEN = 'Tpk_0e3629e14ac24927b78125d85a218b4a'

const TEST_SECRET = 'Tsk_2f2335c5db654db7b8b0d21da312cbaf'

const IEX_OFFICIAL = 'https://cloud.iexapis.com/'

const IEX_SSE_OFFICIAL = 'https://cloud-sse.iexapis.com'

const OFFICIAL_TOKEN =''


export const getTickerStream =  (ticker) => needle.get(IEX_SSE_SANDBOX + '/stable/stocksUS?token='+TEST_TOKEN + '&symbols='+ ticker, options)

export const getTicker5SecondStream =  (ticker) => needle.get(IEX_SSE_SANDBOX + '/stable/stocksUS5Second?token='+TEST_TOKEN + '&symbols='+ ticker, options)

export const getNewsStream = (ticker) => needle.get(IEX_SANDBOX + '/stable/stock/' +ticker +'/news/last/'+15+'?token='+TEST_TOKEN + '&symbols='+ ticker)



export const getCompanyInfo = (ticker) => needle.get(IEX_SANDBOX + '/stable/stock/' +ticker +'/company?token='+TEST_TOKEN)




export var alpacaEndpoint = new Alpaca(
    {keyId : ALPACA_KEY,
    secretKey: ALPACA_SECRET,
    paper: true}
)
export const getBars = async (ticker, config) =>  {
    var bars = alpacaEndpoint.getBarsV2(ticker, config, alpacaEndpoint.configuration)
    var datapoints = []
    
    for await(let b of bars) {
        var datapoint = {x: '', y: ''}
        datapoint['x'] = new Date(b.Timestamp)
        
        datapoint['y'] = [b.OpenPrice, b.HighPrice,b.LowPrice, b.ClosePrice ]
        datapoints.push(datapoint)
      }
      
      return datapoints
}

export const getPrice = async (ticker) =>  {
    var config = {
        start: moment().subtract(7, "days").format(),
        end: moment().subtract(30, "minutes").format(),
        
        timeframe: '1Day'}
    var bars = alpacaEndpoint.getBarsV2(ticker, config, alpacaEndpoint.configuration)
    
    var close
    for await(let b of bars) {
      
        close = b.ClosePrice
      }
      
      return close
}


export const convertUInt8 = (res) => {
    let data = {}
    var dataString = new TextDecoder('utf-8').decode(res)
    var string = JSON.stringify(dataString)
    if(eval(JSON.parse(string))[0] != null){
        data = eval(JSON.parse(string))[0]
            }
    return data
}
