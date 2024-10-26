// src/components/FormComponent.tsx

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import MyForm from "./MyForm"; // Assuming MyForm is a separate component handling form submission

const formSchema = z.object({
  pName: z.string(),
  techStack: z.array(z.string()).nonempty(),
  techPublic: z.boolean().optional(),
  roles: z.array(z.string()).nonempty(),
  address: z.string().nonempty(),
  repoLink: z.string().nonempty("Select a repository"),
});

export default function FormComponent() {}
