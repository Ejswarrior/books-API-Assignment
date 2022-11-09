require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const app = express()

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.use('/books', require('./controllers/booksController'))

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
    () => {console.log(process.env.MONGO_URI)})

app.listen(process.env.PORT)