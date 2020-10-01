const express = require("express")
const app = express()
const route = require("./routes")
const cors = require("cors")


//body parsher
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//from index
app.use(route)


//listen
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})