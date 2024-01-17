import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'mathlive';
import '../../reusable.css'
import './AddQestion.css'

const AddQestion = () => {
    const [serverOperationError, setserverOperationError] = useState(null)
    const [serverOperationLoading, setServerOperationLoading] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionPoint, setQuestionPoint] = useState()
    const [allAnswer, setAllAnswer] = useState([])
    const [questionPic, setQuestionPic] = useState()
    const [answerPic, setAnswerPic] = useState()
    const [previewQuestionPic, setPreviewQuestionPic] = useState()
    const [previewAnswerPic, setPreviewAnswerPic] = useState()
    const [quesionAdded, setQuesionAdded] = useState(false)
    const { chapterID, chapterName } = useParams()
    const newAnswer = []

    const selectQuestionPic = (e) => {
        setQuestionPic(e.target.files[0])
        const picUrl = URL.createObjectURL(e.target.files[0])
        setPreviewQuestionPic(picUrl)
    }

    const addAnswer = () => {
        setAllAnswer(current => [...current, answer]);
        setAnswer('')
    }

    const addQuestion = () => {
        if (chapterName === '') {
            setserverOperationError('Enter the chapter name first!')
        } else {
            const data = { chapterName }
            // updateChapter(data, chapterID, setserverOperationError, setServerOperationLoading, setChapterDetails)
        }
    }

    return (
        <div className="add-question">
            <div>
                <p className='text-color head-title'>Add new question in chapter (<span style={{ color: "rgb(56, 56, 238)" }}>{chapterName}</span>)</p>
                {(serverOperationError) ? <p className='text-error'>{serverOperationError}</p> : ''}
                {(previewQuestionPic) ? <img src={previewQuestionPic} alt="" /> : <label>
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
                            <p className='answer-item' key={item}>{item}</p>
                        )
                    }) : ''}
                </div>
                <input type="text" placeholder='Enter the question points' value={questionPoint} onChange={e => setQuestionPoint(e.target.value)} />
                <button className='button' onClick={addQuestion}>{(serverOperationLoading) ? <span className="button-loader"></span> : 'Add'}</button>
                <Link to={`/chapter/${chapterID}`}><button className='button cancel-button'>Cancel</button></Link>
                <label className={`${(quesionAdded) ? '' : 'answer-pic'}`}>
                    <div>
                        <i className="fa fa-camera" aria-hidden="true"></i>
                        <p>Choose the answer picture</p>
                    </div>
                    {(quesionAdded) ? <input className='select-input' type="file" name='images' onChange={selectQuestionPic} accept='.png, .jpg, .jpeg, .webp' /> : ""}
                </label>
                <button className='button answer-button' onClick={addQuestion}>{(serverOperationLoading) ? <span className="button-loader"></span> : 'Add'}</button>
            </div>
        </div>
    );
}

export default AddQestion;
