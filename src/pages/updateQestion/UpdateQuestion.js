import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import getQuestionDetails from '../../api/getQuestionDetails.api'
import updateQuestion from '../../api/updateQuestion.api'
import addAnswerPic from '../../api/addAnswerPic.api'
import correctIcon from '../../correct-icon.png'
import 'mathlive';
import '../../reusable.css'
import './UpdateQuestion.css'

const UpdateQuestion = () => {
    const [serverOperationError, setserverOperationError] = useState(null)
    const [serverOperationLoading, setServerOperationLoading] = useState(false)
    const [questionDetails, setQuestionDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [serverLoadingPic, setServerLoadingPic] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionPoint, setQuestionPoint] = useState('')
    const [allAnswer, setAllAnswer] = useState([])
    const [questionPic, setQuestionPic] = useState()
    const [answerPic, setAnswerPic] = useState()
    const [previewQuestionPic, setPreviewQuestionPic] = useState()
    const [previewAnswerPic, setPreviewAnswerPic] = useState()
    const [quesionAdded, setQuesionAdded] = useState(false)
    const [quesionFullAdded, setQuesionFullAdded] = useState(false)
    const { qestionID } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getQuestion()
    }, []);

    // get all unit
    const getQuestion = async () => {
        await getQuestionDetails(qestionID, setQuestionDetails, setLoading, setQuestion, setAllAnswer, setQuestionPoint)
    }

    const selectQuestionPic = (e) => {
        setQuestionPic(e.target.files[0])
        const picUrl = URL.createObjectURL(e.target.files[0])
        setPreviewQuestionPic(picUrl)
    }

    const selectAnswerPic = (e) => {
        setAnswerPic(e.target.files[0])
        const picUrl = URL.createObjectURL(e.target.files[0])
        setPreviewAnswerPic(picUrl)
    }

    const addAnswer = () => {
        setAllAnswer(current => [...current, answer]);
        setAnswer('')
    }

    const removeAnswer = (item) => {
        setAllAnswer(current => current.filter(e => e !== item))
    }

    const addNewQuestion = () => {
        if (question === '' || questionPoint === '' || allAnswer.length === 0) {
            setserverOperationError('Enter the question data first!')
        } else {
            const data = new FormData()
            if (questionPic)
                data.append('image', questionPic)
            data.append('question', question)
            allAnswer.map(item => {
                data.append('answer', item)
            })
            data.append('questionPoints', questionPoint)
            updateQuestion(data, qestionID, setserverOperationError, setServerOperationLoading, setQuesionAdded)
        }
    }

    const uploadAnswerPic = () => {
        if (answerPic) {
            const data = new FormData()
            data.append('image', answerPic)
            addAnswerPic(data, questionDetails._id, setserverOperationError, setServerLoadingPic, setQuesionFullAdded, 'update', navigate, questionDetails.chapter)
        } else {
            setserverOperationError('Upload the answer picture first!')
        }
    }

    if (loading) return (<div className='loading-container'><div className='d-flex justify-content-center'><span className="page-loader"></span></div></div>)

    return (
        <div className="update-question">
            <div>
                <p className='text-color head-title'>Update the question</p>
                {(serverOperationError) ? <p className='text-error'>{serverOperationError}</p> : ''}
                {(previewQuestionPic) ? <img className='preview-img' src={previewQuestionPic} alt="" /> : (questionDetails.questionPic) ? <div className='question-pic'>
                    <img src={questionDetails.questionPic} alt="" />
                    <label>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                        <input className='select-input' type="file" name='images' onChange={selectQuestionPic} accept='.png, .jpg, .jpeg, .webp' />
                    </label>
                </div> : <label>
                    <div>
                        <i className="fa fa-camera" aria-hidden="true"></i>
                        <p>Choose the question picture</p>
                    </div>
                    <input className='select-input' type="file" name='images' onChange={selectQuestionPic} accept='.png, .jpg, .jpeg, .webp' />
                </label>}
                <input type="text" placeholder='Enter the question' value={question} onChange={e => setQuestion(e.target.value)} />
                <div className='answer d-flex align-items-center'>
                    <math-field placeholder='Enter the answer' onInput={evt => setAnswer(evt.target.value)}>
                        {answer}
                    </math-field>
                    <span onClick={addAnswer}>+</span>
                </div>
                <div className='d-flex flex-wrap'>
                    {(allAnswer.length != 0) ? allAnswer.map(item => {
                        return (
                            <div className='answer-item' key={item}>
                                <p>{item}</p>
                                <span onClick={() => removeAnswer(item)}>x</span>
                            </div>
                        )
                    }) : ''}
                </div>
                <input type="text" placeholder='Enter the question points' value={questionPoint} onChange={e => setQuestionPoint(e.target.value)} />
                <div className="d-flex">
                    <button className='button' onClick={addNewQuestion}>{(serverOperationLoading) ? <span className="button-loader"></span> : 'Update'}</button>
                    <Link to={`/chapter/${questionDetails.chapter}`}><button className='button cancel-button'>Cancel</button></Link>
                </div>
                {(quesionAdded) ? <div className='correct d-flex align-items-center'>
                    <img src={correctIcon} alt="" />
                    <p>Question added success. you can add the answer picture now.</p>
                </div> : ''}
                {(previewAnswerPic) ? <img className='preview-img' src={previewAnswerPic} alt="" /> : (questionDetails.answerPic) ? <div className='question-pic'>
                    <img src={questionDetails.answerPic} alt="" />
                    <label>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                        <input className='select-input' type="file" name='images' onChange={selectAnswerPic} accept='.png, .jpg, .jpeg, .webp' />
                    </label>
                </div> : <label>
                    <div>
                        <i className="fa fa-camera" aria-hidden="true"></i>
                        <p>Choose the answer picture</p>
                    </div>
                    <input className='select-input' type="file" name='images' onChange={selectAnswerPic} accept='.png, .jpg, .jpeg, .webp' />
                </label>}
                <div className="d-flex">
                    <button className='button answer-button' onClick={uploadAnswerPic}>{(serverLoadingPic) ? <span className="button-loader"></span> : 'Update'}</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateQuestion;
