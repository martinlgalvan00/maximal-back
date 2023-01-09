import express from 'express'
import cors from 'cors'

import NoticesApiRoute from './api/routes/notices.api.routes.js'
import UsersApiRoute from './api/routes/users.api.routes.js'
import RecordsApiRoute from './api/routes/records.api.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', UsersApiRoute)
app.use('/', NoticesApiRoute)
app.use('/', RecordsApiRoute)

export default app