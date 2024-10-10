import React from "react";
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

const navItems = ["Contributors", "Jobs", "Projects", "Hackathons"];

const Header: React.FC = () => (
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
        <Button variant="ghost" size={"icon"} className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M220.07,176.94C214.41,167.2,206,139.73,206,104a78,78,0,1,0-156,0c0,35.74-8.42,63.2-14.08,72.94A14,14,0,0,0,48,198H90.48a38,38,0,0,0,75,0H208a14,14,0,0,0,12.06-21.06ZM128,218a26,26,0,0,1-25.29-20h50.58A26,26,0,0,1,128,218Zm81.71-33a1.9,1.9,0,0,1-1.7,1H48a1.9,1.9,0,0,1-1.7-1,2,2,0,0,1,0-2C53.87,170,62,139.69,62,104a66,66,0,1,1,132,0c0,35.68,8.14,65.95,15.71,79A2,2,0,0,1,209.71,185Z"></path>
          </svg>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="outline-0 focus-visible:outline-none"> 
              <AvatarImage
                src="https://github.com/sujiiiit.png"
                alt="@sujiiit"
              />
              <AvatarFallback className="outline-0 focus-visible:outline-none">SD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={"/profile"}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
);

export default Header;
