const booksTable = require("../models/book.model")
const db = require("../db")
const { eq, ilike } = require('drizzle-orm') // ilike wont check for exact value of search 

exports.getAllBooks = async function (req, res) {
    const search = req.query.search
    if (search) {
        const books = await db.select().from(booksTable).where(ilike(booksTable.title, `%${search}%`)) // its like regex
        return res.json(books);
    }
    const books = await db.select().from(booksTable)
    return res.json(books);
}

exports.getAllBooksById = async function (req, res) {
    const id = req.params.id;

    const [book] = await db.select().from(booksTable).where(table => eq(table.id, id)).limit(1) // returns the single book

    if (!book) {
        return res.status(404).json({ error: `Book with id ${id} does not exists` })
    }
    return res.json(book)
}

exports.CreateBook = async function (req, res) {
    const { title, authorId, description } = req.body;

    if (!title || title == "") {
        return res.status(400).json({ Error: "title is required" });
    }

    const [result] = await db.insert(booksTable).values({
        title,
        authorId,
        description,
    }).returning({
        id: booksTable.id,
    })

    return res.status(201).json({ message: " Book is created successfully ", id: result.id })
}

exports.deleteBookById = async function (req, res) {
    const id = (req.params.id);

    await db.delete(booksTable).where(eq(booksTable.id, id))

    return res.status(200).json({ message: "The book is deleted successfully" });
}