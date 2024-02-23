import mongoose, { Schema } from "mongoose";

interface ILibrary {
    _id: string,
    name: string,
    books: any[],
    createdAt: Date,
}

const schema = new mongoose.Schema<ILibrary>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "A Library must have a name"],
        minlength: [1, "A library name cannot be empty"]
    },
    books: [
        {type: Schema.Types.ObjectId, ref: 'Book'}
    ],
    createdAt: {
        type: Date,
    },
})

schema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
})

schema.post('save', async function(doc, next) {
    await doc.populate("books");
    next();
})

export const Library = mongoose.model('Library', schema)