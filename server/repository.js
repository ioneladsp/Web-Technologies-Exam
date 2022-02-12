import Sequelize from 'sequelize';

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize({
    storage: './examenbd.db',
    dialect: 'sqlite',
  });
}

const Meeting = sequelize.define('Meeting', {
  idMeeting: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  descriereMeeting: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 1000],
    },
  },
  urlMeeting: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isUrl: true },
  },
  dataMeeting: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      customValidator(value) {
        if (new Date(value) < new Date()) {
          throw new Error('invalid date');
        }
      },
    },
  },
});

const Participant = sequelize.define('Participant', {
  idParticipant: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  numeParticipant: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 1000],
    },
  },
});

Meeting.hasMany(Participant, { foreignKey: 'meetingId' });
Participant.belongsTo(Meeting, { foreignKey: 'meetingId' });

async function initialize() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
}

export { initialize, Meeting, Participant, sequelize };
