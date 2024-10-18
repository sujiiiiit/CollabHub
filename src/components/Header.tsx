import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogin = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <header className="h-16 border-b">
      <div className="header max-w-6xl mx-auto flex justify-between h-16 px-4 items-center">
        <a href="#" className="text-[var(--ten)] font-extrabold text-3xl">
          <img src="./assets/logo.svg" className="w-full max-w-32" alt="logo" />
        </a>
        <ul className="flex font-medium h-full flex-1 justify-center items-center list-none gap-11 mx-4 p-0">
          {navItems.map((item) => (
            <li
              key={item}
              className="h-full flex cursor-pointer items-center relative after:absolute after:bottom-0 after:h-1 after:w-full after:border-b-4 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 items-center justify-between h-full">
          <Button variant="ghost" className="rounded-full">
            <svg
              className="w-5 h-5 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z"></path>
            </svg>
            Search
          </Button>
          {user ? (
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
                <DropdownMenuItem onClick={handleLogout} className="text-red-400">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleLogin} className="rounded-full gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path></svg> Sign in</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
