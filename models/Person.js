import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
})

personSchema.pre('save',async function(next){
    const person = this;

    // Hash  the password only if it has been modified (or its new)
    if(!person.isModified('password'))   return next();

    try{
        // Hash password generation
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//Create Person model
const Person = mongoose.model('Person',personSchema);
export default Person;