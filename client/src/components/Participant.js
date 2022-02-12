import React from 'react';
import './Participant.css';
const SERVER = 'http://localhost:8080/api';

export default function Participant({ participant }) {
  const onDelete = async () => {
    const res = await fetch(
      SERVER +
        '/' +
        participant.meetingId +
        '/deleteParticipant/' +
        participant.idParticipant,
      {
        method: 'DELETE',
      }
    );
    if (res.ok) window.location.reload();
    else alert('error');
  };
  return (
    <div className='containerSubelement'>
      <div className='NumeSubelement'>Nume: {participant.numeParticipant}</div>
      <div>
        <button
          className='buttonModificaSubelement'
          onClick={() =>
            (window.location.href =
              '/editParticipant/' +
              participant.meetingId +
              '/' +
              participant.idParticipant)
          }
        >
          Modifica
        </button>
        <button className='buttonStergeSubelement' onClick={onDelete}>
          Sterge
        </button>
      </div>
    </div>
  );
}
