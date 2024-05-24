import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        reuired: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minLength: 6,
    },
    bookings : [{
        type : mongoose.Types.ObjectId,
        ref : "Booking", //Booking collection
    }],
});

export default mongoose.model("User",userSchema);

//users