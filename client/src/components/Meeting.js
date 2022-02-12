import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Participant from './Participant.js';
import './Meeting.css';
const SERVER = 'http://localhost:8080/api';

export default function Meeting() {
  const [meeting, setMeeting] = useState(null);
  const { idMeeting } = useParams();
  useEffect(() => {
    const fetchMeeting = async () => {
      const res = await fetch(SERVER + '/' + idMeeting + '/participants');
      const data = await res.json();
      console.log(data);
      if (data.Participants) {
        setMeeting(data);
      }
    };
    fetchMeeting();
  }, []);

  return (
    <div className='containerParticipant'>
      <a href='/' className='inapoi' style={{ margin: '20px' }}>
        Inapoi la pagina precedenta
      </a>
      <button
        className='buttonAdaugaSubelement'
        onClick={() => (window.location.href = '/newParticipant/' + idMeeting)}
      >
        Adauga participant
      </button>
      <h1 className='titluParticipanti'>Participanti:</h1>
      {meeting && (
        <div className='containerSubelemente'>
          {meeting.Participants.length > 0 && (
            <div className='Subelement'>
              {meeting.Participants.map((participant) => (
                <Participant
                  key={participant.idParticipant}
                  participant={participant}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {!meeting && <h1>Nu exista participanti pentru meetingul selectat!</h1>}
    </div>
  );
}
