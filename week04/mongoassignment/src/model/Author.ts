import mongoose, { Schema } from "mongoose";

interface IAuthor {
    _id: string,
    name: String
    age: number,
    books: any[],
    createdAt?: Date,
}

const schema = new mongoose.Schema<IAuthor>({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "An author must have a name"],
        trim: true,
        unique: true,
    },
    age: {
        type: Number,
        required: [true, "Author must have an age"] 
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: "Book"
    }],
    createdAt: {
        type: Date,
    }
})

schema.virtual('Fullname').get(function(this:any){
    return this.name;
})


schema.pre('save', async function(next){
    if(!this.createdAt){
        this.createdAt = new Date()
    }
    next()
})

schema.statics.getAuthorByBooks = async function(count: number){
    return await mongoose.model('Author').find({books: {$size: count}}).exec()
}

schema.post('save', async function(doc, next){
    await doc.populate("books")
    next()
})




export const Author = mongoose.model("Author", schema)