import mongoose, {Schema, Document} from "mongoose";
import { Author } from "./author";
import { Library } from "./Library";

enum Genre {
    Fiction = 'fiction',
    NonFiction = 'non-fiction',
    Fantasy = 'fantasy',
    Mystery = 'mystery',
    Thriller = 'thriller',
    Romance = 'romance',
    Biography = 'biography',
    History = 'history',
    Science = 'science',
    Other = 'other'
}

interface IBook extends Document {
    _id: string,
    title: string,
    author: any,
    library: any,
    pages: number,
    genre: Genre
    createdAt: Date,
}

const schema = new mongoose.Schema<IBook>({
    title: {
        type: String,
        required: [true, "A book must have a title"],
        minlength: [1, "A books name cannot be empty"],
        trim: true,
    },
    author: {type: Schema.Types.ObjectId, ref: "Author"},
    library: {type: Schema.Types.ObjectId, ref: "Library"},

    pages: {
        type: Number,
        required: [true, "A book must have a page count"],
        min: [1, "A book must have at least one page"],
    },
    genre: {
        type: String,
        enum: Object.values(Genre),
        required: [true, "A book must have a genre"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const addBookToAuthor = async (authorId: string, bookId: string) => {
    try{
        const author = await Author.findById(authorId)
        const book = await Book.findById(bookId)

        if(!author || !book){
            throw new Error("Author or book not found")
        }

        if(book.author && book.author.toString()!== authorId){
            throw new Error("Book belongs to another author")
        }
        author.books.push(bookId);
        book.author = authorId;
        await Promise.all([author.save(), book.save()]);
        console.log("Book added to author: ", author, book)
    } catch(error){
        console.error("error adding book to author", error)
    }
}

const addBookToLibrary = async (libraryId: string, bookId: string) => {
    try {
        const library = await Library.findById(libraryId);
        const book = await Book.findById(bookId);

        if (!library || !book) {
            throw new Error("Library or book not found");
        }

        library.books.push(bookId);
        book.library = libraryId;
        await Promise.all([library.save(), book.save()]);
        console.log("Book added to library:", library, book);
    } catch (error) {
        console.error("Error adding book to library:", error);
    }
};

schema.pre('save', async function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
})

schema.post('save', async function(doc, next) {
    try {
        const authorId = this.author;
        const bookId = this._id;
        const libraryId = this.library;

        if (authorId && libraryId && bookId) {
            const author = await mongoose.model('Author').findById(authorId);
            const library = await mongoose.model('Library').findById(libraryId);

            if (author) {
                author.books.push(bookId);
                await author.save();
            }
            if (library) {
                library.books.push(bookId);
                await library.save();
            }
        }

        next();
    } catch (error) {
    }
})

export const Book = mongoose.model("Book", schema)