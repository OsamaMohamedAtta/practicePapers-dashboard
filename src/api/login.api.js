const URL = 'http://localhost:8000/admin/login'

const login = (userData, setServerError, setLoading) => {
    setLoading(true)
    fetch(`${URL}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                localStorage.setItem('O_authDB', responseJson.Token)
                window.location.reload();
            } else {
                setServerError(responseJson.message)
                setLoading(false)
            }
        })
        .catch((error) => {
            setServerError(error.message)
            setLoading(false)
        });
}

export default login;