import React, { useState, useEffect } from 'react';
import './HomePage.css';
const SERVER = 'http://localhost:8080/api';

export default function HomePage() {
  const [meetings, setMeetings] = useState([]);
  const [dataMeeting, setData] = useState('');
  const [urlMeeting, setUrl] = useState('');
  const [urlJSON, setUrlImport] = useState('');

  useEffect(() => {
    const fetchMeetings = async () => {
      const res = await fetch(SERVER + '/meetings');
      const data = await res.json();
      setMeetings(data);
    };

    fetchMeetings();
  }, []);

  const onSort = async () => {
    const res = await fetch(SERVER + '/sorted');
    const data = await res.json();
    setMeetings(data);
  };

  const onFilter = async () => {
    if (dataMeeting !== '' && urlMeeting !== '') {
      const res = await fetch(
        SERVER +
          `/meetings/?filter=urlMeeting-endsWith-${urlMeeting},dataMeeting-startsWith-${dataMeeting}`
      );
      const data = await res.json();
      setMeetings(data);
      const inputUrl = document.getElementById('inputUrl');
      inputUrl.value = '';
      const inputData = document.getElementById('inputData');
      inputData.value = '';
    } else {
      alert('Pentru filtrare trebuie completate ambele campuri');
    }
  };

  const onReload = async () => {
    const res = await fetch(SERVER + '/meetings');
    const data = await res.json();
    setMeetings(data);
  };

  const onExport = async () => {
    const res = await fetch(SERVER + '/allMeetings/allParticipants');
    const data = await res.json();
    let dataStr = JSON.stringify(data);
    let dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    let exportFileDefaultName = 'data.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const onImport = async () => {
    console.log(urlJSON);
    const resUrl = await fetch(urlJSON);
    const dataFromUrl = await resUrl.json([]);
    console.log(dataFromUrl);
  };

  return (
    <div className='body'>
      <h3 className='titlu'>Meetings</h3>
      <div className='container'>
        <button
          className='buttonAdaugaElement'
          onClick={() => (window.location.href = '/newMeeting')}
        >
          Adauga meeting
        </button>
        <button className='buttonSorteaza' onClick={onSort}>
          Sorteaza meetinguri dupa campuri
        </button>
        <button className='buttonRevenire' onClick={onReload}>
          Revenire la date initiale
        </button>
        <button className='buttonFiltreaza' onClick={onFilter}>
          Filtreaza meetings
        </button>
        <input
          className='inputUrl'
          id='inputUrl'
          type='text'
          placeholder='Domeniul URL'
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <input
          className='inputData'
          id='inputData'
          type='text'
          placeholder='Data'
          onChange={(e) => setData(e.target.value)}
        ></input>
        {meetings.length > 0 &&
          meetings.map((meeting) => {
            const onDelete = async () => {
              const res = await fetch(
                SERVER + '/meetings/' + meeting.idMeeting,
                {
                  method: 'DELETE',
                }
              );
              if (res.ok) window.location.reload();
              else alert('error');
            };
            return (
              <div key={meeting.idMeeting} className='containerElement'>
                <div className='divDescriereMeeting'>
                  Descriere: {meeting.descriereMeeting}
                </div>
                <div>
                  <a className='divUrlMeeting' href={meeting.urlMeeting}>
                    URL: {meeting.urlMeeting}
                  </a>
                </div>

                <div className='divDataMeeting'>
                  Data: {meeting.dataMeeting}
                </div>
                <button
                  className='buttonAcceseaza'
                  onClick={() =>
                    (window.location.href = '/' + meeting.idMeeting)
                  }
                >
                  Vezi participanti meeting
                </button>
                <button
                  className='buttonEdit'
                  onClick={() =>
                    (window.location.href = '/editMeeting/' + meeting.idMeeting)
                  }
                >
                  Modifica
                </button>
                <button className='buttonDelete' onClick={onDelete}>
                  Sterge
                </button>
              </div>
            );
          })}
        <button className='buttonExport' onClick={onExport}>
          Export
        </button>
        <button className='buttonImport' onClick={onImport}>
          Import
        </button>
        <input
          className='inputImport'
          id='inputImport'
          type='text'
          placeholder='Introduceti link pentru import json'
          onChange={(e) => setUrlImport(e.target.value)}
        ></input>
      </div>
    </div>
  );
}
