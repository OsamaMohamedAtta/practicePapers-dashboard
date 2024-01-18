const URL = 'http://localhost:8000/question/updateAnswerPic/'

const addAnswerPic = (data, quesionID, setserverOperationError, setServerLoadingPic, setQuesionFullAdded, endPoint, navigate, chapterID) => {
    setServerLoadingPic(true)
    fetch(`${URL}${quesionID}`, {
        method: 'put',
        body: data
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                setServerLoadingPic(false)
                setserverOperationError(null)
                if(endPoint == 'add'){
                    setQuesionFullAdded(true)
                }else{
                    navigate(`/chapter/${chapterID}`)
                }
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