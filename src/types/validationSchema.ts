"use client";
import { z } from "zod";

export const searchSchema = z
  .string()
  .refine((value) => /^[^\d]*$/.test(value), {
    message: "Números não são permitidos",
  });

export const fruitSchema = z.object({
  name: z.string().nonempty("O nome da fruta é obrigatório"),
  quantity: z.preprocess(
    (v) => parseFloat(String(v)),
    z.number().min(1, "A quantidade deve ser maior ou igual a 1")
  ),
  value: z.preprocess(
    (v) => parseFloat(String(v)),
    z.number().min(0, "O valor deve ser maior ou igual a 0")
  ),
  url: z.string().url("A URL deve ser válida"),
});

export type FruitFormInputs = z.infer<typeof fruitSchema>;
