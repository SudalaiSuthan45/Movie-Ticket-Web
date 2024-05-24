import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Admin from "./components/Auth/Admin";
import Movies from "./components/Movies/Movies";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./profile/AdminProfile";


function App() {

  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  console.log("Is Admin Logged In",isAdminLoggedIn);
  console.log("Is User Logged In",isUserLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {

      if ( localStorage.getItem("userId")){
        dispatch(userActions.login());
      }
      else if ( localStorage.getItem("adminId")){
        dispatch(adminActions.login());
      }

    },[dispatch]);

  return <div>
    <Header />
    <section>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />

        { !isUserLoggedIn && !isAdminLoggedIn && (
          <>
            {" "}
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth />} />
          </>
        )}

        { isUserLoggedIn && !isAdminLoggedIn && (
          <>
            {" "}
            <Route path="/user" element={<UserProfile />} />
            <Route path="/booking/:id" element={<Booking />} />
          </>
        )}

        { !isUserLoggedIn && isAdminLoggedIn && (
          <>
            {" "}
            <Route path="/add" element={<AddMovie />} />
            <Route path="/user-admin" element={<AdminProfile />} />
          </>
        )}

      </Routes>
    </section>
  </div> 
}


export default App;
