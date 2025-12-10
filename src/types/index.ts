// Type definitions (User, Payment, etc)

export interface User {
  id?: string;
  name_ar: string;
  name_en: string;
  phone: string;
  city: string;
  national_id: string;
  college: string;
  year: string;
  age: number;
  gender: "male" | "female";
  bus: boolean;
  payment_number?: string;
  payment_code?: string;
  payment_image: File | null;
  status: "pending" | "approved";
}
