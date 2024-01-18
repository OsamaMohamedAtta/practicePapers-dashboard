const URL = 'http://localhost:8000/question/updateQuestion/'

const updateQuestion = (data, questionID, setserverOperationError, setServerOperationLoading, setQuesionAdded) => {
    setServerOperationLoading(true)
    fetch(`${URL}${questionID}`, {
        method: 'put',
        body: data
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                setQuesionAdded(true)
                setServerOperationLoading(false)
                setserverOperationError(null)
            } else {
                setserverOperationError(responseJson.message)
                setServerOperationLoading(false)
            }
        })
        .catch((error) => {
            setserverOperationError(error.message)
            setServerOperationLoading(false)
        });
}

export default updateQuestion;