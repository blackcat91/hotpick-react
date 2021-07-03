import React from 'react'
import {Link} from 'react-router-dom'
import { getPortfolio } from '../store/mongoCalls'


class PortfolioInfo extends React.Component{

    constructor(props){
        super(props)
        this.state={
    data : {}}
    }

    componentDidMount() {
        let p = getPortfolio(this.props.id)
        p.on('data', (res)=> {
            this.state.data = res
            this.forceUpdate()
        })
    }

    render() {
        return(<div><Link to={'/portfolio/'+ this.state.data._id}><div className='portfolioInfo'>
        <span>{this.state.data.portfolio_name}</span>
        
        </div></Link></div>)

    }
}

export default PortfolioInfo