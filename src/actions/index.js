export const login = (userData) => {
    return {
        type: 'LOGIN',
        payload: userData
        
    }
}

export const custData = (data) => {
    return {
        type: 'CUST_DATA',
        payload: data
    }
}

export const payment = (data) => {
    return {
        type: 'PAY_DATA',
        payload: data
    }
}

export const orders = (data) => {
    return {
        type: 'ORDERS',
        payload: data
    }
}


export const logout = () => {
    return {
        type: 'LOG_OUT'
      
        
    }
}

export const curLocation = () => {
        return {
            type: 'CURRENT',   
        }
      
    
}

export const directions = (origin, destination) => {

    return {
        type: "DIRECTIONS",
        payload: {origin, destination}
    }
}


export const callback = (response) => {

        return {
            type : "CALLBACK",
            payload: response
        }
}

export const clear = () => {
    return {
        type: "CLEAR"
    }
}

export const prices = (price) => {

    return {
        type: "PRICES",
        payload: price
    }
}

export const deliver = (delivery) => {

    return {
        type: "DELIVER",
        payload: delivery
    }
}
export const size = (size) => {

    return {
        type: "SIZE",
        payload: size
    }
}
export const type = (type) => {

    return {
        type: "TYPE",
        payload: type
    }
}