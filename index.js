require("dotenv/config")
const express = require("express");
const bookRouter = require('./routes/books.routes')
const authorRouter = require('./routes/author.routes')
const { loggerMiddleware } = require('./MIddlewares/logger')
const { log } = require("node:console");

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(loggerMiddleware)

//routes
app.use('/books', bookRouter);
app.use("/authors", authorRouter);

app.listen(PORT, (req, res) => {
    console.log(`My server is running on port : ${PORT}`)
}) 