import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/lib/store";
import { setUser, setLoading } from "@/lib/slices/userSlice";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
          withCredentials: true,
        });
        dispatch(setUser(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      await axios.get("http://localhost:5000/logout", {
        withCredentials: true,
      });
      dispatch(setUser(null));
      console.log("User logged out");
      window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // If still loading, show loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h1>Welcome, {user.username}</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>User data not available</p>
      )}
    </div>
  );
};

export default Profile;
