import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import addQestion from '../../api/addQuestion.api'
import addAnswerPic from '../../api/addAnswerPic.api'
import correctIcon from '../../correct-icon.png'
import 'mathlive';
import '../../reusable.css'
import './AddQestion.css'

const AddQestion = () => {
    const [serverOperationError, setserverOperationError] = useState(null)
    const [serverOperationLoading, setServerOperationLoading] = useState(false)
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
    const [quesionID, setQuesionID] = useState()
    const { chapterID, chapterName, unitID } = useParams()

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
        setAllAnswer(current => current.filter(e => e != item))
    }

    const addNewQuestion = () => {
        if (question === '' || questionPoint === '' || allAnswer.length === 0) {
            setserverOperationError('Enter the question data first!')
        } else {
            const data = new FormData()
            if(questionPic)
            data.append('image', questionPic)
            data.append('question', question)
            allAnswer.map(item => {
                data.append('answer', item)
            })
            data.append('questionPoints', questionPoint)
            data.append('chapter', chapterID)
            data.append('unit', unitID)
            addQestion(data, setserverOperationError, setServerOperationLoading, setQuesionAdded, setQuesionID)
        }
    }

    const uploadAnswerPic = () => {
        if (answerPic) {
            const data = new FormData()
            data.append('image', answerPic)
            addAnswerPic(data, quesionID, setserverOperationError, setServerLoadingPic, setQuesionFullAdded)
        } else {
            setserverOperationError('Upload the answer picture first!')
        }
    }

    const newQuestion = () => {
        setQuesionFullAdded(false)
        setQuestion('')
        setAnswer('')
        setQuestionPoint('')
        setAllAnswer([])
        setQuestionPic()
        setAnswerPic()
        setPreviewQuestionPic()
        setPreviewAnswerPic()
        setQuesionAdded(false)
    }

    return (
        <div className="add-question">
            <div>
                <p className='text-color head-title'>Add new question in chapter (<span style={{ color: "rgb(56, 56, 238)" }}>{chapterName}</span>)</p>
                {(serverOperationError) ? <p className='text-error'>{serverOperationError}</p> : ''}
                {(previewQuestionPic) ? <img className='preview-img' src={previewQuestionPic} alt="" /> : <label>
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
                    <button className='button' onClick={addNewQuestion}>{(serverOperationLoading) ? <span className="button-loader"></span> : 'Add'}</button>
                    <Link to={`/chapter/${chapterID}`}><button className='button cancel-button'>Cancel</button></Link>
                </div>
                {(quesionAdded) ? <div className='correct d-flex align-items-center'>
                    <img src={correctIcon} alt="" />
                    <p>Question added success. you can add the answer picture now.</p>
                </div> : ''}
                {(previewAnswerPic) ? <img className='preview-img' src={previewAnswerPic} alt="" /> : <label className={`${(quesionAdded) ? '' : 'answer-pic'}`}>
                    <div>
                        <i className="fa fa-camera" aria-hidden="true"></i>
                        <p>Choose the answer picture</p>
                    </div>
                    {(quesionAdded) ? <input className='select-input' type="file" name='images' onChange={selectAnswerPic} accept='.png, .jpg, .jpeg, .webp' /> : ""}
                </label>}
                <div className="d-flex">
                    <button className='button answer-button' onClick={uploadAnswerPic}>{(serverLoadingPic) ? <span className="button-loader"></span> : 'Add'}</button>
                </div>
            </div>
            {/* add question popup start */}
            {(quesionFullAdded) ? <div className="add-question-popup question-popup d-flex justify-content-center align-items-center">
                <div className='d-flex justify-content-center align-items-center flex-direction-column '>
                    <img src={correctIcon} alt="" />
                    <p className='text-color'>Success</p>
                    <p className='text-color'>Congratulations, the full question has been successfully added.</p>
                    <button className='button' onClick={newQuestion}>Add another question</button>
                    <Link to={`/chapter/${chapterID}`}><button className='button cancel-button'>Redirect to chapter page</button></Link>
                </div>
            </div> : ''}
            {/* add question popup end */}
        </div>
    );
}

export default AddQestion;
