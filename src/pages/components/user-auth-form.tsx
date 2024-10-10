"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setLoading } from "@/lib/slices/userSlice";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function UserAuthFormLogin({ className, ...props }: UserAuthFormProps) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => (state.user as any).loading);

  async function click(event: React.SyntheticEvent) {
    event.preventDefault();
    dispatch(setLoading(true));

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000);
  }

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Button
        onClick={(event) => {
          click(event);
          handleLogin();
        }}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}
        GitHub
      </Button>
    </div>
  );
}

export default UserAuthFormLogin;
