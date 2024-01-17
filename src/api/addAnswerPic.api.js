const URL = 'http://localhost:8000/question/updateAnswerPic/'

const addAnswerPic = (data, quesionID, setserverOperationError, setServerLoadingPic, setQuesionFullAdded) => {
    setServerLoadingPic(true)
    fetch(`${URL}${quesionID}`, {
        method: 'put',
        body: data
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                setQuesionFullAdded(true)
                setServerLoadingPic(false)
                setserverOperationError(null)
            } else {
                setserverOperationError(responseJson.message)
                setServerLoadingPic(false)
            }
        })
        .catch((error) => {
            setserverOperationError(error.message)
            setServerLoadingPic(false)
        });
}

export default addAnswerPic;