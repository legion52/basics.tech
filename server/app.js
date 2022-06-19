const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const { request } = require('express')
const userRouter = require('./routes/userRouter')
const peopleRouter = require('./routes/peopleRouter')
const dbConnect = require('./db/config')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fileUpload = require('express-fileupload');
const path = require('path')




const PORT = 3001
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));


app.use( 
  session({
    name:'sid',
    store: new FileStore({}),
    saveUninitialized: false,
    secret: 'dsmkalmdkl',
    resave: false,
  })
);




app.use('/api/v1/auth', userRouter)
app.use('/api/v1/people', peopleRouter)



app.listen(PORT, () => {
  dbConnect()
  console.log('Server start on port ', PORT)
})
