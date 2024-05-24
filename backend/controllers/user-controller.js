import Bookings from '../models/Bookings';
import User from '../models/User';
import bcrypt from 'bcryptjs';

//All users
export const getAllUsers = async(req,res,next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        return console.log(err);
    }

    if (!users)
    {
        return res.status(500).json({message:"Cant Retrieve All Users"});
    }

    return res.status(200).json ({ users });

};

//new user
export const signup = async(req,res,next) => {
    const { name,email,password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim()==="" && !password && password.trim()=== ""){
        return res.staus(422).json ({ message:"Invalid Inputs"});
    }

    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = new User({name,email,password:hashedPassword});
        user = await user.save();
    }catch (err) {
        return console.log(err);
    }
    if (!user){
        return res.status(501).json({message:"Something Went Wrong ...User didnt signup"});
    }
    return res.status(200).json ({ id : user._id });
};

//update user
export const updateUser = async(req,res,next) => {
    const id = req.params.id;   //get id from url

    const { name,email,password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim()==="" && !password && password.trim()=== ""){
        return res.staus(422).json ({ message:"Invalid Inputs"});
    }

    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = await User.findByIdAndUpdate(id,{name, email, password:hashedPassword});

    }catch (errr){
        return console.log(errr);
    }
    if ( !user ){
        return res.status(502).json ({message:"Something Went Wrong....Cant Update"});
    }
    return res.status(200).json ({ message:"Updated Successfull" });
};

//Delete User
export const deleteUser = async(req,res,next) => {
    const id = req.params.id;   //get id from url

    let user;
    try {
        user = await User.findByIdAndDelete(id);

    }catch (err)
    {
        return console.log(err);
    }

    if ( !user ){
        return res.status(503).json ({message:"Unable to Delete...."});
    }
    return res.status(203).json ({ message:"Deleted !!!" });

};

//login user

export const login = async(req,res,next) => {

    const { email,password } = req.body;

    if ( !email && email.trim() ==="" && !password && password.trim() === ""){
        return res.staus(422).json ({ message:"Invalid Inputs"});
    }

    let existingUser;
    try{
        existingUser  = await User.findOne({ email });
    }catch (err){
        return console.log(err);
    }

    if ( !existingUser) {
        return res.status(404).json({message:"Invalid User...Cant find email"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

    if ( !isPasswordCorrect) {
        return res.status(400).json({message:" Incorrect Password..."});
    }

    return res.status(200).json({ existingUser,message:"Login Successfull",id: existingUser._id });
       
};

//getuserbookings

export const getBookingsOfUser = async (req,res,next) => {
    const id = req.params.id;

    let bookings;

    try {
        bookings = await Bookings.find({user: id}).populate("user movie");
    }catch(err){
        return console.log(err);
    }

    if ( !bookings ){
        return res.status(500).json ({ message : " Unable to get bookings..."});
    }

    return res.status(200).json ({ bookings });
};

//getuser

export const getUserById = async(req,res,next) => {
    const id = req.params.id;

    let user;
    try {
        user = await User.findById(id);
    }
    catch (err) {
        return console.log(err);
    }

    if (!user)
    {
        return res.status(500).json({message:"Cant Retrieve User"});
    }

    return res.status(200).json ({ user });

};

