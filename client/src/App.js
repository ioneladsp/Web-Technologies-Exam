import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormMeeting from './components/FormMeeting.js';
import FormParticipant from './components/FormParticipant.js';
import HomePage from './components/HomePage.js';
import Meeting from './components/Meeting.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/newMeeting' element={<FormMeeting edit={false} />} />
        <Route
          path='/editMeeting/:idMeeting'
          element={<FormMeeting edit={true} />}
        />
        <Route
          path='/newParticipant/:idMeeting'
          element={<FormParticipant edit={false} />}
        />
        <Route
          path='/editParticipant/:idMeeting/:idParticipant'
          element={<FormParticipant edit={true} />}
        />
        <Route path='/:idMeeting' element={<Meeting />} />
      </Routes>
    </BrowserRouter>
  );
}
