const mysql = require('mysql2');
const AWS = require('aws-sdk');

// Configure AWS region
AWS.config.update({ region: 'ap-south-1' }); // change region if needed

const ssm = new AWS.SSM();

async function getDbParams() {
  const paramNames = [
    '/nodeapp/db/hostname',
    '/nodeapp/db/user',
    '/nodeapp/db/password',
    '/nodeapp/db/name',
    '/nodeapp/db/port'
  ];

  const data = await ssm.getParameters({
    Names: paramNames,
    WithDecryption: true
  }).promise();

  const params = {};
  data.Parameters.forEach(p => {
    const key = p.Name.split('/').pop(); // use last part as key
    params[key] = p.Value;
  });

  return params;
}

async function createPool() {
  const dbParams = await getDbParams();

  const pool = mysql.createPool({
    host: dbParams.hostname,
    user: dbParams.user,
    password: dbParams.password,
    database: dbParams.name,
    port: dbParams.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  return pool.promise();
}

module.exports = createPool;
