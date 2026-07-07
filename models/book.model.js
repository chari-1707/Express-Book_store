const { pgTable, uuid, varchar, text,index } = require("drizzle-orm/pg-core")
const {sql} = require("drizzle-orm")
const authorTable = require("./author.model")


const booksTable = pgTable("books",
    {
        id: uuid().primaryKey().defaultRandom(),
        title: varchar({ length: 60 }).notNull(),
        description: text(),
        authorId: uuid().references(() => authorTable.id).notNull(),
    },
    (table) => ({
        searchIndexOnTitle: index("title_index").using(
        'gin',
         sql`to_tsvector('english', ${table.title})`
        ),
    })
)

module.exports = booksTable;