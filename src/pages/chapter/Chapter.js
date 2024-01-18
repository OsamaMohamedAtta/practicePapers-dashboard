import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import getChapter from '../../api/getChapter.api'
import updateChapter from '../../api/updateChapter.api'
import deleteQuestion from '../../api/deleteQuestion.api'
import addChapter from '../../api/addChapter.api'
import addUnit from '../../api/addUnit.api'
import 'mathlive';
import '../../reusable.css'
import './Chapter.css'

const Chapter = () => {
    const [chapterDetails, setChapterDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [serverOperationError, setserverOperationError] = useState(null)
    const [serverOperationLoading, setServerOperationLoading] = useState(false)
    const [chapterName, setChapterName] = useState('')
    const [questionID, setQuestionID] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionPoint, setQuestionPoint] = useState(0)
    const [allAnswer, setAllAnswer] = useState([])
    const [questionPic, setQuestionPic] = useState()
    const [answerPic, setAnswerPic] = useState()
    const [previewQuestionPic, setPreviewQuestionPic] = useState()
    const [previewAnswerPic, setPreviewAnswerPic] = useState()
    const { chapterID } = useParams()
    const newAnswer = []

    useEffect(() => {
        getchapterDetails()
    }, []);

    // get all unit
    const getchapterDetails = async () => {
        await getChapter(chapterID, setChapterDetails, setLoading)
    }

    // update chapter func start  
    const openUpdatePopup = (chapterName) => {
        setChapterName(chapterName)
        setserverOperationError(null)
        document.querySelector('.update-chapter-popup').classList.replace('d-none', 'd-flex');
    }

    const closeUpdatePopup = () => {
        document.querySelector('.update-chapter-popup').classList.replace('d-flex', 'd-none');
    }

    const update = () => {
        if (chapterName === '') {
            setserverOperationError('Enter the chapter name first!')
        } else {
            const data = { chapterName }
            updateChapter(data, chapterID, setserverOperationError, setServerOperationLoading, setChapterDetails)
        }
    }
    // update chapter func end    

    // delete question func start  
    const openDeleteQuestionPopup = (quesionID) => {
        setQuestionID(quesionID)
        document.querySelector('.delete-question-popup').classList.replace('d-none', 'd-flex');
    }

    const closeDeleteQuestionPopup = () => {
        document.querySelector('.delete-question-popup').classList.replace('d-flex', 'd-none');
    }

    const deleteTheQuestion = () => {
        deleteQuestion(questionID, chapterID, setserverOperationError, setServerOperationLoading, setChapterDetails)
    }
    // delete question func end    

    if (loading) return (<div className='loading-container'><div className='d-flex justify-content-center'><span className="page-loader"></span></div></div>)

    return (
        <div className='chpater-container'>
            <div className='d-flex justify-content-space-between align-items-center'>
                <p className='chapter-head-name'>{chapterDetails.chapterName}</p>
                <div className='chapter-icon'>
                    <Link to={`/addQuestion/${chapterDetails.chapterName}/${chapterID}/${chapterDetails.unit}`}><i className="fa fa-plus icon" aria-hidden="true"></i></Link>
                    <i onClick={() => openUpdatePopup(chapterDetails.chapterName)} className="fa fa-pencil" aria-hidden="true"></i>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                </div>
            </div>
            {chapterDetails.questions?.map(item => {
                return (
                    <div key={item._id} className='question d-flex justify-content-space-between'>
                        <p>{item.question}</p>
                        <div>
                            <Link to={`/updateQuestion/${item._id}`}><i className="fa fa-pencil icon" aria-hidden="true"></i></Link>
                            <i onClick={() => openDeleteQuestionPopup(item._id)} className="fa fa-trash-o" aria-hidden="true"></i>
                        </div>
                    </div>
                )
            })}
            {/* update chapter popup start */}
            <div className="update-chapter-popup chapter-popup d-none justify-content-center align-items-center">
                <div>
                    <p className='text-color'>Update chapter name</p>
                    {(serverOperationError) ? <p className='text-error'>{serverOperationError}</p> : ''}
                    <input type="text" placeholder='Enter the chapter name' value={chapterName} onChange={e => setChapterName(e.target.value)} />
                    <button className='button' onClick={update}>{(serverOperationLoading) ? <span className="button-loader"></span> : 'Update'}</button>
                    <button className='button' onClick={closeUpdatePopup}>Cancel</button>
                </div>
            </div>
            {/* update chapter popup end */}

            {/* delete question popup start */}
            <div className="delete-question-popup chapter-popup d-none justify-content-center align-items-center">
                <div>
                    <p className='text-color'>Are you sure you want to delete this question?</p>
                    {(serverOperationError) ? <p className='text-error'>{serverOperationError}</p> : ''}
                    <button className='button' onClick={deleteTheQuestion}>{(serverOperationLoading) ? <span className="button-loader"></span> : 'Delete'}</button>
                    <button className='button' onClick={closeDeleteQuestionPopup}>Cancel</button>
                </div>
            </div>
            {/* delete chapter popup end */}
        </div>
    );
}

export default Chapter;
