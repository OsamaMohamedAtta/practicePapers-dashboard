const URL = 'http://localhost:8000/question/getQuestionDetails/'

const getQuestionDetails = (questionID, setQuestionDetails, setLoading, setQuestion, setAllAnswer, setQuestionPoint) => {
    setLoading(true)
    fetch(`${URL}${questionID}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                setQuestionDetails(responseJson.question)
                setQuestion(responseJson.question.question)
                setAllAnswer(responseJson.question.answer)
                setQuestionPoint(responseJson.question.questionPoints)
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

export default getQuestionDetails;