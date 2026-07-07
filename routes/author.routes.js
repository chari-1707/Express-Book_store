const express = require("express");
const authorsTable = require("../models/author.model");
const db = require("../db");
const { eq } = require("drizzle-orm");

const router = express.Router();

router.get("/", async (req, res) => {
    const authors = await db.select().from(authorsTable);
    return res.json(authors);
})

router.get("/:id", async (req, res) => {
    const [author] = await db.select().from(authorsTable).where(eq(authorsTable.id, req.params.id));

    if (!author) {
        return res.status(404).json({ error: `Author with ID ${req.params.id} doesnt exist` })
    }
    return res.json(author)
})

router.post("/", async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const [result] = await db.insert(authorsTable).values({
        firstName,
        lastName,
        email
    }).returning({ id: authorsTable.id });

    return res.json({ message: "Author has been created", id: result.id });
})

module.exports = router;
