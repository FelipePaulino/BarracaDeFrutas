"use client";
import { z } from "zod";

export const searchSchema = z
  .string()
  .refine((value) => /^[^\d]*$/.test(value), {
    message: "Números não são permitidos",
  });
