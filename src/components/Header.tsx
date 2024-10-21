import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { fetchUser } from "@/lib/slices/userSlice";
import axios from "axios";

const navItems = ["Contributors", "Projects", "Hackathons"];

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(
    (state: RootState) =>
      state.user.user as {
        username: string;
      } | null
  );
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    dispatch(fetchUser()).finally(() => setLoading(false)); // Set loading to false after fetching user data
  }, [dispatch]);

  useEffect(() => {
    const toggleButton = document.querySelector(
      '[data-collapse-toggle="navbar-sticky"]'
    );
    const navbarMenu = document.getElementById("navbar-sticky");

    const handleToggle = () => {
      navbarMenu?.classList.toggle("dis-none");
    };

    toggleButton?.addEventListener("click", handleToggle);

    return () => {
      toggleButton?.removeEventListener("click", handleToggle);
    };
  }, []);

  const handleLogin = () => {
    window.open(import.meta.env.VITE_SERVER_URL + "/auth/github", "_self");
  };

  const handleLogout = () => {
    axios
      .post(
        import.meta.env.VITE_SERVER_URL + "/auth/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <header id="header" className="z-50 bg-white h-16 border-b">
      <div className="header flex flex-wrap md:h-16 items-center justify-between mx-auto p-4 relative max-w-6xl">
        <a
          href="#"
          className="text-[var(--ten)] font-extrabold text-3xl h-full flex items-center"
        >
          <img src="./assets/logo.svg" className="w-full max-w-32" alt="logo" />
        </a>
        <div
          id="navbar-sticky"
          className="items-center justify-between w-full dis-none md:!flex md:w-auto order-1 md:order-none z-20"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            {navItems.map((item) => (
              <li
                key={item}
                className="h-full flex cursor-pointer items-center relative after:absolute after:bottom-0 after:h-1 after:w-full after:border-b-4 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 items-center justify-between h-full">
          {loading ? (
             <Avatar className="outline-0 focus-visible:outline-none">
             
             <AvatarFallback className="outline-0 focus-visible:outline-none">
              
             </AvatarFallback>
           </Avatar>
          ) : user ? (
            
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="outline-0 focus-visible:outline-none">
                  <AvatarImage
                    src={`https://github.com/${user.username}.png`}
                    alt={`@${user.username}`}
                  />
                  <AvatarFallback className="outline-0 focus-visible:outline-none">
                    {user.username[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/profile"}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-400">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleLogin} className="bg-black rounded-full gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#fff"
                viewBox="0 0 256 256"
              >
                <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
              </svg>
              Sign in
            </Button>
          )}
          <Button
            data-collapse-toggle="navbar-sticky"
            variant={"ghost"}
            size={"icon"}
            className="md:hidden flex"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
