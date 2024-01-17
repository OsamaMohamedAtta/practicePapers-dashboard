import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../reusable.css'
import './QuestionType.css'

const QuestionType = () => {
    const allQuestionType = [
        {
            _id: "65a4963482dbaac16d820fc6",
            typeOfquestion: "Topic Questions",
            typeOfexam: "65a48ede82dbaac16d820fc2"
        },
        {
            _id: "65a4964b82dbaac16d820fc8",
            typeOfquestion: "Past Papers",
            typeOfexam: "65a48ede82dbaac16d820fc2"
        },
        {
            _id: "65a4966182dbaac16d820fca",
            typeOfquestion: "Topic Questions",
            typeOfexam: "65a48f1482dbaac16d820fc4"
        },
        {
            _id: "65a4967182dbaac16d820fcc",
            typeOfquestion: "Past Papers",
            typeOfexam: "65a48f1482dbaac16d820fc4"
        }
    ]
    const { examBoardID } = useParams()
    const questionType = allQuestionType.filter(e => e.typeOfexam === examBoardID)
    return (
        <div className='h-100vh d-flex justify-content-center align-items-center'>
            <div className='question-type-container d-flex justify-content-center align-items-center flex-direction-column'>
                {questionType.map(item => {
                    return (
                        <Link to={`/unit/${item._id}`}><button className='button' key={item._id}>{item.typeOfquestion}</button></Link>
                    )
                })}
            </div>
        </div>
    );
}

export default QuestionType;
