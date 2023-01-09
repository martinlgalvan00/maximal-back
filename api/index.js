import express from 'express'
import cors from 'cors'

import NoticesApiRoute from './routes/notices.api.routes.js'
import UsersApiRoute from './routes/users.api.routes.js'
import RecordsApiRoute from './routes/records.api.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', UsersApiRoute)
app.use('/', NoticesApiRoute)
app.use('/', RecordsApiRoute)

export default app