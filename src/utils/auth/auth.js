const render_url = 'https://realestate-p973.onrender.com'

async function loginUser(formInput) {
    try {
        const response = await fetch(`${render_url}/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formInput),
            // credentials: 'include'
        })
        console.log(response)
        return response
    } catch(err) {
        console.log(err.message)
        return err

    }
    
}


export default loginUser