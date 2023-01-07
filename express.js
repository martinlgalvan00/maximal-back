import express from 'express'
import cors from 'cors'
import NoticesApiRoute from './api/routes/notices.api.routes.js'
import UsersApiRoute from './api/routes/users.api.routes.js'
import RecordsApiRoute from './api/routes/records.api.routes.js'



const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

app.use(express.static('public'))
app.use('/', UsersApiRoute)
app.use('/', NoticesApiRoute)
app.use('/', RecordsApiRoute)




app.listen(2022, function () {
    console.log('server started')
})