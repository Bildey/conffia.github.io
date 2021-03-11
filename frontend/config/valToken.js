





async function validateToken() {
    var validatingToken 
    const json = localStorage.getItem(userKey)
    const userData = JSON.parse(json)

    if(!userData) {
        validatingToken  = false
        //go to login
        return
    }
    const res = await axios.post(`http://localhost:3000/validateToken`, userData)
    if (res.data) {
        validatingToken = true
        return validatingToken
        
        
    } else {
        validatingToken = false
        localStorage.removeItem(userKey)
         //go to login
         return
    }
    
}

export function validateToken()

