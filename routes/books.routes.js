const express = require("express")
const controller = require('../controllers/book.controller')
const router = express.Router()

router.get('/', controller.getAllBooks)

router.get("/:id",controller.getAllBooksById)

router.post("/", controller.CreateBook)

router.delete("/:id", controller.deleteBookById);

module.exports = router