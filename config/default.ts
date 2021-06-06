// * 1 set up the config file
require('dotenv').config()

export default {
  port: 5002,
  host: 'localhost',
  dbUri: 'mongodb://localhost/portfolioDB-development',
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
  privateKey: process.env.privateKey
}
