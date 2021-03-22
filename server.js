import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import cards from './dbCards.js'

const app = express()
const port = process.env.PORT || 3000
const connection_url = `mongodb+srv://admin:zenab13@cluster0.qjv9e.mongodb.net/tinderdb?retryWrites=true&w=majority`

app.use(express.json())
app.use(Cors())

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.get('/', (req, res) => res.status(200).send("Hello World!!"))

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    cards.create(dbCard, (error, data) => {
        if (error) {
            return res.status(500).send(error)
        }
        res.status(201).send(data)
    })
})

app.get('/tinder/cards', (req, res) => {
    try {
        cards.find((error, data) => {
            if (error) {
                return res.status(500).send(error)
            }
            res.status(200).send(data)
        })
    } catch (err) {
        console.log(err);
    }
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})