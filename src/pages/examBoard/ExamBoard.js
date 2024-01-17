import React from 'react';
import { Link } from 'react-router-dom';
import '../../reusable.css'
import './ExamBoard.css'


const ExamBoard = () => {
    const allExamBoard = [
        {
            _id: "65a48ede82dbaac16d820fc2",
            typeOfExam: "Cambridge"
        },
        {
            _id: "65a48f1482dbaac16d820fc4",
            typeOfExam: "Edexcel"
        }
    ]
    return (
        <div className='h-100vh d-flex justify-content-center align-items-center'>
            <div className='exam-board-container'>
                <h1>IGSCE</h1>
                <p className='text-color'>chose the exam board</p>
                {allExamBoard.map(item => {
                    return (
                        <Link to={`/questionType/${item._id}`}><button className='button' key={item._id}>{item.typeOfExam}</button></Link>
                    )
                })}
            </div>
        </div>
    );
}

export default ExamBoard;
