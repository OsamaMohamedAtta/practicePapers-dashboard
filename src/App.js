import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Login from './pages/login/Login'
import ExamBoard from './pages/examBoard/ExamBoard'
import QuestionType from './pages/questionType/QuestionType'
import Unit from './pages/unit/Unit'
import Chapter from './pages/chapter/Chapter'
import AddQestion from './pages/addQuestion/AddQestion'

function App() {
  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    });
  }, []);
  const isAuth = localStorage.getItem('O_authDB')
  return (
    <>
      {(isAuth) ? <Navbar /> : ''}
      <Routes>
        <Route path='/auth' element={isAuth ? <Navigate to='/examBoard' /> : <Login />} />
        <Route path='/' element={<Navigate to='/examBoard' />} />
        <Route path='/examBoard' element={isAuth ? <ExamBoard /> : <Navigate to='/auth' />} />
        <Route path='/questionType/:examBoardID' element={isAuth ? <QuestionType /> : <Navigate to='/auth' />} />
        <Route path='/unit/:questionTypeID' element={isAuth ? <Unit /> : <Navigate to='/auth' />} />
        <Route path='/chapter/:chapterID' element={isAuth ? <Chapter /> : <Navigate to='/auth' />} />
        <Route path='/addQestion/:chapterName/:chapterID' element={isAuth ? <AddQestion /> : <Navigate to='/auth' />} />
      </Routes>
    </>
  );
}

export default App;
