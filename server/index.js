import express from 'express'
import { globalError } from './src/middleware/globalError.js'
import { AppError } from './src/utils/appError.js'
import cors from 'cors'
import { dbConn } from './databases/dbConnection.js'
import { bootstrap } from './src/bootstrap.js'

import 'dotenv/config'

const app = express()
const port = process.env.PORT || 4000
app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('uploads'))

bootstrap(app)


app.use('*', (req, res, next) => {
    next(new AppError(`route not found ${req.originalUrl}`, 404))
})

app.use(globalError)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))