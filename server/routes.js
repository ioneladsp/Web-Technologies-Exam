import express from 'express';
import { Meeting, Participant, sequelize } from './repository.js';
import {
  getRecords,
  postRecord,
  deleteRecords,
  getRecord,
  headRecord,
  putRecord,
  patchRecord,
  deleteRecord,
  getParticipantsForMeeting,
  deleteParticipantFromMeeting,
  putParticipantForMeeting,
  postParticipantForMeeting,
  getParticipantByIdForMeetingById,
  sortedMeetings,
  getAllMeetingsAndParticipants,
} from './service.js';

const router = express.Router();

router.route('/sync').get(async (request, response) => {
  await sequelize.sync({ force: true });
});

router
  .route('/meetings')
  .get((request, response) => getRecords(Meeting, request, response))
  .post((request, response) => postRecord(Meeting, request, response))
  .delete((request, response) => deleteRecords(Meeting, request, response));

router
  .route('/meetings/:id')
  .get((request, response) => getRecord(Meeting, request, response)) //returneaza obiect
  .head((request, response) => headRecord(Meeting, request, response)) //verifica daca exista meetingul
  .put((request, response) => putRecord(Meeting, request, response)) //sa modific complet
  .patch((request, response) => patchRecord(Meeting, request, response)) //sa modific dupa campuri
  .delete((request, response) => deleteRecord(Meeting, request, response)); //sa sterg

router
  .route('/participants')
  .get((request, response) => getRecords(Participant, request, response))
  .post((request, response) => postRecord(Participant, request, response))
  .delete((request, response) => deleteRecords(Participant, request, response));

router
  .route('/participants/:id')
  .get((request, response) => getRecord(Participant, request, response)) //returneaza obiect
  .head((request, response) => headRecord(Participant, request, response)) //verifica daca exista participantul
  .put((request, response) => putRecord(Participant, request, response)) //sa modific complet
  .patch((request, response) => patchRecord(Participant, request, response)) //sa modific dupa campuri
  .delete((request, response) => deleteRecord(Participant, request, response)); //sa sterg

//SUBRESURSA
router
  .route('/:meetingId/participants')
  .get((request, response) =>
    getParticipantsForMeeting(Meeting, request, response)
  );

router
  .route('/:meetingId/participant/:participantId')
  .get((request, response) =>
    getParticipantByIdForMeetingById(Meeting, request, response)
  );

router
  .route('/:meetingId/deleteParticipant/:participantId')
  .delete((request, response) =>
    deleteParticipantFromMeeting(Meeting, request, response)
  );

router
  .route('/:meetingId/putParticipant/:participantId')
  .put((request, response) =>
    putParticipantForMeeting(Meeting, request, response)
  );

router
  .route('/:meetingId/postParticipant')
  .post((request, response) =>
    postParticipantForMeeting(Meeting, request, response)
  );

router
  .route('/sorted')
  .get((request, response) => sortedMeetings(Meeting, request, response));

router
  .route('/allMeetings/allParticipants')
  .get((request, response) =>
    getAllMeetingsAndParticipants(Meeting, request, response)
  );
export default router;
