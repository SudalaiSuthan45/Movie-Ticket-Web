import axios from "axios";

export const getAllMovies = async () => {

    const res = await axios
        .get("/movie")
        .catch((err) => console.log(err));

    if ( res.status !== 200) {
        return console.log("No Data No Movies");
    }

    const data = await res.data;        //getting req.... all movies from backend
    return data;
     
};

export const sendUserAuthRequest = async(data,signup) => {

    const res = await axios
        .post(`/user/${signup?"signup" : "login"}`, {
        name :  signup ? data.name : "",
        email : data.email,
        password : data.password
        })
        .catch((err) => console.log(err));

        if ( res.status !== 200 && res.status !== 201 ){
            console.log("Unexpected error occurred Can't Signup/Login");
        }

        const resData = await res.data;
        return resData;

};

export const sendAdminAuthRequest = async(data) => {

    const res = await axios
        .post("/admin/login",{
            email : data.email,
            password : data.password,
        })
        .catch((err) => console.log(err));

        if ( res.status !== 200 ){
            return console.log("Unexpected error occurred Admin didn't created");
        }

        const resData = await res.data;
        return resData;

};

export const getMovieDetails = async(id) => {
    
    const res = await axios
        .get(`/movie/${id}`)
        .catch((err) => console.log(err));

        if ( res.status !== 200 ){
            return console.log("Unexpected error can't fetch movie details");
        }

        const resData = await res.data;
        return resData;
};

export const newBooking = async(data) => {
    
    const res = await axios
        .post("/booking",{
            movie : data.movie,
            seatNumber : data.seatNumber,
            date : data.date,
            user : localStorage.getItem("userId"),
        })
        .catch((err) => console.log(err));

        if ( res.status !== 200 ){
            return console.log("Couldn't to book Movie ");
        }

        const resData = await res.data;
        return resData;
};


export const getUserBooking = async () => {

    const id = localStorage.getItem("userId");

    const res = await axios
        .get(`/user/bookings/${id}`)
        .catch((err) => console.log(err));

    if ( res.status !== 200) {
        return console.log("No Bookings Yet !!");
    }

    const resData = await res.data;        
    return resData;

};

export const deleteBooking = async (id) => {

    const res = await axios
        .delete(`/booking/${id}`)
        .catch((err) => console.log(err));

    if ( res.status !== 200) {
        return console.log(" Unable to Delete Booking !!");
    }

    const resData = await res.data;        
    return resData;

};

export const getUserDetails = async () => {

    const id = localStorage.getItem("userId");

    const res = await axios
        .get(`/user/${id}`)
        .catch((err) => console.log(err));

    if ( res.status !== 200) {
        return console.log("Couldn't Get User Details !!");
    }

    const resData = await res.data;        
    return resData;

};

export const addMovie = async (data) => {

    const res = await axios
        .post("/movie",{
            title : data.title,
            description : data.description,
            releaseDate : data.releaseDate,
            posterUrl : data.posterUrl,
            featured : data.featured,
            actors : data.actors,

            admin : localStorage.getItem("adminId"),
        },
        {
            headers : {
             Authorization : `Bearer ${localStorage.getItem("token")}`,
            }
        }
        ).catch((err) => console.log(err));

        if ( res.status !== 201 ){
            return console.log("Unexpected Error");
        }

        const resData = await res.data;
        return resData;

};

export const getAdminById = async() => {

    const id = localStorage.getItem("adminId");

    const res = await axios
        .get(`/admin/${id}`)
        .catch((err) => console.log(err));

    if ( res.status !== 200 ){
        
        return console.log("No Admin");
    }

    const resData = await res.data;
    return resData;
};


