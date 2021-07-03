import React from 'react'


class Footer extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {}

    render() {
        
        return (<div id= 'footer' className='foot'>
            <div className='leftFoot'>
            <h2 style={{'color': 'red'}}>HotPicks</h2>
            <a style={{'font-size': '1.5em', 'text-decoration': 'none', 'color': 'gold'}} href='https://github.com/blackcat91' target='_blank'>GitHub</a>
            <br></br>
            <br></br>
            <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
            </div>
            <div className='contact'>
                <h2>Brandon Winters</h2>
                <h2>(702)381-8907</h2>
                <h2><a href='mailto:brandondw1991@gmail.com'>brandondw1991@gmail.com</a></h2>
            </div>
        </div>)
    }
}

export default Footer