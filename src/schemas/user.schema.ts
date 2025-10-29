import * as z from "zod";
import { User } from "../interfaces/user.interface";

z.config(z.locales.es());

const userSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("El email debe ser válido"),
});

export const validateUser = (user: Partial<User>) => {
  return userSchema.safeParse(user);
};

export const validateUserPartial = (user: Partial<User>) => {
  return userSchema.partial().safeParse(user);
};

