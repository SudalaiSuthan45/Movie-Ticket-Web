import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

export const addAdmin = async (req,res,next) => {

    const { email,password } = req.body;

    if ( !email && email.trim() ==="" && !password && password.trim() === ""){
        return res.staus(422).json ({ message:"Invalid Inputs"});
    }

    let existingAdmin;

    try {
        existingAdmin = await Admin.findOne({ email });
    }catch(err){
        return console.log(err);
    }

    if ( existingAdmin ){
        return res.status(400).json({message:"Admin Already Exists.."});
    }

    let admin;

    const hashedPassword = bcrypt.hashSync(password);

    try{
        admin = new Admin({ email, password:hashedPassword });
        admin = await admin.save();

    }catch(err){
        return console.log(err);
    }

    if ( !admin ){
        return res.status(500).json({message:"Unable to store Admin"});
    }

    return res.status(201).json({ admin });

};

export const adminLogin = async (req,res,next) => {

    const { email,password } = req.body;

    if ( !email && email.trim() ==="" && !password && password.trim() === ""){
        return res.staus(422).json ({ message:"Invalid Inputs"});
    }

    let existingAdmin;

    try {
        existingAdmin = await Admin.findOne({ email });

    }catch(err){
        return console.log(err);
    }

    if ( !existingAdmin ){
        return res.status(400).json({message:" Not Found Admin"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingAdmin.password);
    
    if ( !isPasswordCorrect ){
        return res.status(400).json({message:"Incorrect Password"});
    }

    const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
        expiresIn : "30d",
    });


    return res
    .status(200)
    .json({message:"Authentication Completed...",token,id:existingAdmin._id});

};

export const getAdmins = async(req,res,next) => {
    let admins;

    try {
        admins = await Admin.find();
    }catch(err){
        return console.log(err);
    }

    if ( !admins ){
        return res.status(500).json ( { message : " Internal Server Error.."});
    }

    return res.status(200).json ({ admins });
};

export const getAdminById = async(req,res,next) => {

    const id = req.params.id;

    let admin;

    try {
        admin = await Admin.findById(id).populate("addedMovies");
    }catch(err){
        return console.log(err);
    }

    if ( !admin ){
        
        return console.log("Can't Find Admin");
    }

    return res.status(200).json ({ admin });
};