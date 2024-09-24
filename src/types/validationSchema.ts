"use client";
import { z } from "zod";

// Validação do campo de pesquisa
export const searchSchema = z
  .string()
  .refine((value) => /^[^\d]*$/.test(value), {
    message: "Números não são permitidos",
  });

// Esquema de validação para o formulário de frutas
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

// Geração do tipo TypeScript a partir do esquema Zod
export type FruitFormInputs = z.infer<typeof fruitSchema>;
