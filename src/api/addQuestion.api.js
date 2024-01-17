const URL = 'http://localhost:8000/question/addQuestion'

const addQestion = (data, setserverOperationError, setServerOperationLoading, setQuesionAdded, setQuesionID) => {
    setServerOperationLoading(true)
    fetch(`${URL}`, {
        method: 'post',
        body: data
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                setQuesionAdded(true)
                setQuesionID(responseJson.questionData._id)
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

export default addQestion;