const cyclic_url = 'https://easy-rose-coral-veil.cyclic.app'

async function loginUser(formInput) {
    try {
        const response = await fetch(`${cyclic_url}/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formInput),
            credentials: 'include'
        })
        return response
    } catch(err) {
        return err
    }
    
}


export default loginUser