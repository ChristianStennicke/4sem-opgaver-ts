const { MongoClient, ServerApiVersion } = require('mongodb');

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
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("bank-db").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Insert a new document into a collection
        await client.db("test").collection("people").insertOne({ name: "John Doe", age: 25 });

        // Find all documents in a collection
        const allDocuments = await client.db("test").collection("people").find().toArray();
        console.log("All documents:", allDocuments);

        // Find all documents in a collection and format the output
        await client.db("test").collection("people").find().forEach((doc: Record<string, any>) => console.log(doc));


        // Find all documents in a collection that matches a query
        const johnDoeDocs = await client.db("test").collection("people").find({ name: "John Doe" }).toArray();
        console.log("John Doe documents:", johnDoeDocs);

        // Find the first document that matches a query
        const firstDoc = await client.db("test").collection("people").findOne();
        console.log("First document:", firstDoc);

        // Update a document
        await client.db("test").collection("people").updateOne({ name: "John Doe" }, { $set: { age: 26 } });

        // Update all documents that match a query
        await client.db("test").collection("people").updateMany({ name: "John Doe" }, { $set: { age: 26 } });

        // Delete a document
        await client.db("test").collection("people").deleteOne({ name: "John Doe" });

        // Delete all documents that match a query
        await client.db("test").collection("people").deleteMany({ name: "John Doe" });

        // Aggregation pipeline example
        const aggregationResult = await client.db("test").collection("people").aggregate([
            { $match: { name: "John Doe" } },
            { $group: { _id: "$name", total: { $sum: "$age" } } }
        ]).toArray();
        console.log("Aggregation result:", aggregationResult);

        // Increment a value
        await client.db("test").collection("people").updateOne({ name: "John Doe" }, { $inc: { score: 1 } });
        await client.db("test").collection("people").updateOne({ name: "John Doe", age: 25 }, { $inc: { score: 20 } });

        // Limit the number of documents returned
        const limitedDocs = await client.db("test").collection("people").find().limit(5).toArray();
        console.log("Limited documents:", limitedDocs);

        // Sort documents
        const sortedDocs = await client.db("test").collection("people").find().sort({ name: 1 }).toArray();
        console.log("Sorted documents:", sortedDocs);

        // Find documents with age less than or equal to a value
        const ageFilteredDocs = await client.db("test").collection("people").find({ age: { $lte: 25 } }).toArray();
        console.log("Age filtered documents:", ageFilteredDocs);

    } finally {
        // Ensure the client will close when finished/error
        await client.close();
    }
}

run().catch(console.dir);
