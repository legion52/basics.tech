const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // poolSize: 10,
  // bufferMaxEntries: 0,

}

const DB_HOST = 'localhost'
const DB_NAME = 'Finlead'
const DB_PORT = 27017


const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}}`


const dbConnect = () => {
  mongoose.connect(dbConnectionURL, options, (err) => {
    if(err) return console.log(err)
    return console.log('Success connected to mongo')
  })

}

module.exports = dbConnect
