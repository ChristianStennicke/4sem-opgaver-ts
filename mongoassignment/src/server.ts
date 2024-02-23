const {MongoClient, ServerApiVersion} = require('mongodb');
import { Book } from "./model/Book";
import { Library } from "./model/Library";
import { Author } from "./model/author";
import { ObjectId } from "mongodb";

const uri = "mongodb+srv://demo:yke99wmg@fullstack.gdbujaw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        // create new Author
        const newAuthor = {
            name: "John Doe",
            age: 35,
            books: [],
            createdAt: new Date()
        };




        const result = await client.db("fullstack").collection("authors").insertOne(newAuthor)
        console.log(`New author inserted with the _id: ${result.insertedId}`);

        // create new Book
        const newBook = new Book({
            title: "Sample Book",
            author: result.insertedId, 
            library: [],
            pages: 300,
            genre: 'fiction',
            createdAt: new Date()
        });

        
        const bookResult = await newBook.save();
        console.log(`New book inserted with the _id: ${bookResult._id}`);

        // Create new Library
        const newLibrary = new Library({
            _id: new ObjectId(),
            name: "Sample Library",
            books: [],
            createdAt: new Date()
        });

        
        const libraryResult = await newLibrary.save();
        console.log(`New library inserted with the _id: ${libraryResult._id}`);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);