import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FormMeeting.css';

const SERVER = 'http://localhost:8080/api';

export default function FormMeeting({ edit }) {
  const { idMeeting } = useParams();
  const [descriereMeeting, setDescriere] = useState('');
  const [urlMeeting, setUrl] = useState('');
  const [dataMeeting, setData] = useState('');

  useEffect(() => {
    const fetchMeeting = async () => {
      if (edit) {
        const res = await fetch(SERVER + '/meetings/' + idMeeting);
        const data = await res.json();
        setDescriere(data.descriereMeeting);
        setUrl(data.urlMeeting);
        setData(data.dataMeeting);
      }
    };
    fetchMeeting();
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    if (descriereMeeting && descriereMeeting.length > 3) {
      if (edit) {
        const res = await fetch(SERVER + '/meetings/' + idMeeting, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            descriereMeeting,
            urlMeeting,
            dataMeeting,
          }),
        });
        if (res.ok) window.location.href = '/';
        else alert('Eroare');
      } else {
        const res = await fetch(SERVER + '/meetings/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            descriereMeeting,
            urlMeeting,
            dataMeeting,
          }),
        });
        if (res.ok) window.location.href = '/';
        else alert('Eroare');
      }
    } else alert('Descrierea trebuie sa aiba minim 3 caractere');
  };
  return (
    <div className='body'>
      <a href={'/'} className='inapoi'>
        Inapoi
      </a>
      <br></br>
      <h2>Introduceti date pentru meeting</h2>
      <form className='formMeeting' onSubmit={submit}>
        <input
          value={descriereMeeting}
          onChange={(e) => setDescriere(e.target.value)}
          placeholder='Descriere'
          className='inputDescriereElement'
        />
        <input
          value={urlMeeting}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Url'
          className='inputUrlElement'
        />
        <input
          value={dataMeeting}
          onChange={(e) => setData(e.target.value)}
          placeholder='Data'
          className='inputDataElement'
        />
        <button className='buttonTrimiteElement' type='submit'>
          Salveaza
        </button>
      </form>
    </div>
  );
}
