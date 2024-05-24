import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Movie from "../models/Movie";
import User from "../models/User";

export const newBooking = async (req,res,next) => {

    const { movie, date, seatNumber, user } = req.body;

    let existingMovie;
    let existingUser;

    try {
        existingMovie  = await Movie.findById(movie);
        existingUser = await User.findById(user);
    }catch(err){
        return console.log(err);
    }

    if ( !existingMovie ){
        return res.status(404).json ({ message : "Movie Not Found with Given Id "});
    }

    if ( !existingUser ){
        return res.status(404).json ({ message : "User Not Found with Given Id "});
    }

    let booking;

    try {

        booking = new Bookings({ movie, date:new Date(`${date}`), seatNumber, user });

        const session = await mongoose.startSession();
        session.startTransaction();

        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);

        await existingUser.save({ session });
        await existingMovie.save({ session });
        await booking.save({ session });

        session.commitTransaction();

    }catch(err){
        return console.log(err);
    }

    if ( !booking ){
        return res.status(500).json ({ message : "Unable to create a booking "});
    }

    return res.status(200).json ({ existingMovie,existingUser,booking });
};

//get booking 

export const getBookingId = async (req,res,next) => {
    const id = req.params.id;

    let booking;

    try {
        booking = await Bookings.findById(id);
    }catch(err){
        return console.log(err);
    }

    if ( !booking ){
        return res.status(500).json ({ message : "Unexpected Error.."});
    }

    return res.status(200).json ({ booking });
};

//delete booking

export const deleteBooking = async (req,res,next) => {
    const id = req.params.id;

    let booking;

    try {
        booking = await Bookings.findByIdAndDelete(id).populate("user movie");    //collects ref collections for delete

        console.log(booking);
        
        const session = await mongoose.startSession();
        session.startTransaction();

        await booking.user.bookings.pull(booking); // delete pull from user - bookings array
        await booking.movie.bookings.pull(booking); // delete pull from movie - bookings array

        await booking.user.save({ session });
        await booking.movie.save({ session });

        session.commitTransaction();

        }catch(err){
        return console.log(err);
    }

    if ( !booking ){
        return res.status(500).json ({ message : "Unable to Delete Booking..."});
    }

    return res.status(200).json ({ message : "Successfully Deleted Booking..."});
};