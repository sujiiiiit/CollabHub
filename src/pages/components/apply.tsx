"use client";

import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  message: z.string().min(1, "This field is required"),
  resume: z.instanceof(FileList)

});

export default function DrawerDialogDemo() {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.user);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 600px)");

  if (isAuthenticated) {
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary lg:w-auto w-[calc(100%_-_16px)] text-black hover:border-black hover:border hover:outline-none hover:shadow-[4px_4px_0_0_#000] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px] mx-2 ">
              Collaborate Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:rounded-none">
            <DialogHeader>
              <DialogTitle>Apply</DialogTitle>
            </DialogHeader>
            <ProfileForm className="flex flex-col gap-2" />
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="bg-primary lg:w-auto w-[calc(100%_-_16px)] text-black hover:border-black hover:border hover:outline-none hover:shadow-[4px_4px_0_0_#000] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px] mx-2">
            Collaborate Now
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Apply</DrawerTitle>
          </DrawerHeader>
          <ProfileForm className="px-4 flex flex-col gap-2" />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger>
            <Button className="bg-primary lg:w-auto w-[calc(100%_-_16px)] text-black hover:border-black hover:border hover:outline-none hover:shadow-[4px_4px_0_0_#000] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px] mx-2">
              Collaborate Now
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign in to Continue</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit", // Only validates on submit
  });

  const userId = useSelector(
    (state: RootState) => state.user.user?._id ?? null
  );

  const hardcodedRolePostId = "67890"; // Hardcoded rolePostId

  const onSubmit: (values: z.infer<typeof formSchema>) => Promise<void> = async (values) => {
    try {
      const formData = new FormData();
      formData.append("message", values.message);
      formData.append("userId", userId?userId:"");
      formData.append("rolePostId", hardcodedRolePostId);
      formData.append("resume", values.resume[0]); // Assuming resume is a FileList
  
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/application/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      toast.success("Role created successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to submit the form.");
    }
  };
  

  const fileRef = form.register("resume");


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduction</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write why you want to be part of our project..."
                  className="resize-none rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field, fieldState }) => {
            return (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Choose a file"
                    {...fileRef}
                    onChange={(event) => {
                      field.onChange(event.target?.files?.[0] ?? undefined);
                    }}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
function setOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

