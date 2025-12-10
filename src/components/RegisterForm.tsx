import { useState } from "react";
import { api } from "../api/api";
import type { User } from "../types/index";

const RegisterForm = () => {
    const [formData, setFormData] = useState<User & { email: string }>({
        name_ar: "",
        name_en: "",
        email: "",
        phone: "",
        city: "",
        national_id: "",
        college: "",
        year: "",
        age: 0,
        gender: "male",
        bus: false,
        payment_image: null,
        payment_code: "",
        status: "pending"
    });

    // Generic handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            payment_image: e.target.files?.[0] || null
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const data = new FormData();
    
      // Loop على formData وحط كل قيمة
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          data.append(key, value as string);
        }
      });

      try {
        const res = await api.post("/register", data);
        console.log("Success:", res.data);
        alert("Registration successful!");
      } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong!");
      }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <label>Name (Arabic)</label>
            <input type="text" name="name_ar" onChange={handleChange} pattern="^[\u0600-\u06FF\s]*$" required />

            <label>Name (English)</label>
            <input type="text" name="name_en" onChange={handleChange} pattern="^[A-Za-z\s]*$" required />

            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />

            <label>Phone</label>
            <input type="text" name="phone" onChange={handleChange} pattern="[0-9]{11}" required />

            <label>City (Arabic)</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">اختر المحافظة</option>
              <option value="القاهرة">القاهرة</option>
              <option value="الجيزة">الجيزة</option>
              <option value="الاسكندرية">الإسكندرية</option>
              <option value="الشرقية">الشرقية</option>
              <option value="الدقهلية">الدقهلية</option>
              <option value="المنوفية">المنوفية</option>
              <option value="الغربية">الغربية</option>
              <option value="السويس">السويس</option>
              <option value="بورسعيد">بورسعيد</option>
              <option value="المنيا">المنيا</option>
              <option value="أسيوط">أسيوط</option>
              <option value="قنا">قنا</option>
              <option value="الأقصر">الأقصر</option>
              <option value="البحر الأحمر">البحر الأحمر</option>
              <option value="جنوب سيناء">جنوب سيناء</option>
              <option value="شمال سيناء">شمال سيناء</option>
              <option value="دمياط">دمياط</option>
              <option value="كفر الشيخ">كفر الشيخ</option>
              <option value="سوهاج">سوهاج</option>
              <option value="بني سويف">بني سويف</option>
              <option value="أسوان">أسوان</option>
              <option value="الفيوم">الفيوم</option>
              <option value="الإسماعيلية">الإسماعيلية</option>
            </select>
                
            <label>National ID</label>
            <input type="text" name="national_id" onChange={handleChange} pattern="[0-9]{14}" required />

            <label>College (Arabic)</label>
            <input type="text" name="college" onChange={handleChange} pattern="^[؀-ۿ\s]*$" required />

            <label>Year</label>
            <input type="text" name="year" onChange={handleChange} pattern="[0-9]{4}" required />

            <label>Age</label>
            <input type="number" name="age" onChange={handleChange} />

            <label>Gender</label>
            <select name="gender" onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <label>Want Bus?</label>
            <input type="checkbox" name="bus" onChange={handleChange} />

            <label>Payment Image</label>
            <input type="file" name="payment_image" onChange={handleFileChange} />

            <label>Payment Code (Optional)</label>
            <input type="text" name="payment_code" onChange={handleChange} />

            <button type="submit">Submit</button>
        </form>
    );
};

export default RegisterForm;
