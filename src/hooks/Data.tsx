import { createContext } from "react";
import type { User } from "../types/index";

export const DataUser = createContext<User | null>(null); 
