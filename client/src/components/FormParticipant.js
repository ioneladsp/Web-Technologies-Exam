import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FormParticipant.css';
const SERVER = 'http://localhost:8080/api';

export default function FormParticipant({ edit }) {
  const { idMeeting, idParticipant } = useParams();
  const [numeParticipant, setNume] = useState('');

  useEffect(() => {
    const fetchParticipant = async () => {
      if (edit) {
        const res = await fetch(SERVER + '/' + idMeeting + '/participants/');
        const data = await res.json();
        const participant = data.Participants.filter(
          (part) => part.meetingId === idMeeting
        )[0];
        setNume(participant.numeParticipant);
      }
    };
    fetchParticipant();
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    if (numeParticipant && numeParticipant.length >= 5) {
      if (edit) {
        const res = await fetch(
          SERVER + '/' + idMeeting + '/putParticipant/' + idParticipant,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              numeParticipant,
            }),
          }
        );
        if (res.ok) window.location.href = '/' + idMeeting;
        else alert('Eroare');
      } else {
        const res = await fetch(SERVER + '/' + idMeeting + '/postParticipant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numeParticipant,
          }),
        });
        if (res.ok) window.location.href = '/' + idMeeting;
        else alert('Eroare');
      }
    } else alert('Numele participantului trebuie sa aiba minim 5 caractere');
  };
  return (
    <div className='containerParticipant'>
      <a href={'/' + idMeeting} className='inapoi'>
        Inapoi
      </a>
      <br></br>
      <h2>Introduceti date pentru participant</h2>
      <form className='formParticipant' onSubmit={submit}>
        <input
          value={numeParticipant}
          onChange={(e) => setNume(e.target.value)}
          placeholder='Nume'
          className='inputNumeSubelement'
        />
        <button className='buttonTrimiteSubelement' type='submit'>
          Salveaza
        </button>
      </form>
    </div>
  );
}
