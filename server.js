require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(`${process.env.DB_CONNECT_URL}${process.env.DB_NAME}`, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => {
  console.error(error)
})
db.once('open', () => {
  console.log(`Connected to API Databases`)
})

app.use(express.json())

// Routing for Subscribers
const subscribersRouter = require('./routes/subscribers')
app.use(`/api/${process.env.SUBSCRIBERS_DB}`, subscribersRouter)

// Routing for Samples
const samplesRouter = require('./routes/samples')
app.use(`/api/${process.env.SAMPLES_DB}`, samplesRouter)


app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started on port ${process.env.SERVER_PORT}`)
})