const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { readData, writeData } = require("./function")
require('dotenv').config()

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my API with NodeJS')
})

app.get("/dishes", (req, res) => {
    const data = readData()
    res.json(data.dishes)
})

app.post("/dishes", (req, res) => {
    const data = readData()
    const dish = req.body
    const newDish = {
        id: data.dishes.length + 1,
        ...dish
    }
    data.dishes.push(newDish)
    writeData(data)
    res.json(newDish)
})
// ===============================================================================================
app.put("/dishes/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id)
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes[dishIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "Dish updated succuessfully" })
})

app.delete("/books/:id", (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const bookIndex = data.books.findIndex(book => book.id === id)
    data.books.splice(bookIndex, 1)
    writeData(data)
    res.json({ message: "Book deleted successfully" })
})

// ===============================================================================================
const port = process.env.PORT
app.listen(port, () => {
    console.log(`El servidor se está ejecutando en HTTP://localhost:${port}`)
})