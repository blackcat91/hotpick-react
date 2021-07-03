import needle from 'needle'


const DOMAIN = 'https://brung3.ngrok.io'

var mongoOptions = {
    headers : {"Access-Control-Allow-Origin": DOMAIN,"Same-Site": 'Secure' ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}
}

export const register = (data) => needle.post(DOMAIN + '/users/register', data, mongoOptions)

export const login = (data) => needle.post(DOMAIN + '/users/login', data, mongoOptions)

export const getUser = (id) => needle.get(DOMAIN + '/users/'+ id, mongoOptions)

export const logout = (token) => needle.post(DOMAIN + '/users/logout', token, mongoOptions)

export const editUser = (id, data) => needle.put(DOMAIN + '/users/'+id, data, mongoOptions)

export const deleteUser = (data) => needle.delete(DOMAIN + '/users', data, mongoOptions)

export const getPublicPortfolios = () => needle.get(DOMAIN + '/portfolios', mongoOptions)

export const getPortfolio = (id) => needle.get(DOMAIN + '/portfolios/'+id, mongoOptions)

export const getPortfolios = (data) => needle.post(DOMAIN + '/portfolios', data, mongoOptions)

export const createPortfolio = (data) => needle.post(DOMAIN + '/portfolios/create', data, mongoOptions)

export const deletePortfolio = (data) => needle.delete('/portfolios', data, mongoOptions)

export const addStock = (data) => needle.put(DOMAIN + '/portfolios/add', data, mongoOptions)

export const removeStock = (data) => needle.put(DOMAIN + '/portfolios/remove', data)

export const getStocks = (data) => needle.post(DOMAIN + '/stocks', data, mongoOptions)

export const getStockList = (data) => needle.post(DOMAIN + '/stocks/list', data, mongoOptions)

export const getTopTen = () => needle.get(DOMAIN + '/stocks/topTen', mongoOptions)

export const getStock = (ticker) => needle.get(DOMAIN + '/stocks/' + ticker, mongoOptions)

export const verify = (token) => needle.post(DOMAIN + '/verify', {token: token})

export const searchStocks = (query) => needle.get(DOMAIN + '/stocks/search/' + query,mongoOptions)

