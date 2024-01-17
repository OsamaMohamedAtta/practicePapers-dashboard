const URL = 'http://localhost:8000/unit/getUnit/'

const getUnit = (questionTypeID, setAllUnit, setLoading) => {
    setLoading(true)
    fetch(`${URL}${questionTypeID}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                setAllUnit(responseJson.allUnit)
                setLoading(false)
            } else {
                setLoading(false)
            }
        })
        .catch((error) => {
            console.log(error.message)
            setLoading(false)
        });
}

export default getUnit;