"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader
import UserInput from "@/components/input/userInput/userInput";
import RoundedButton from "@/components/button/roundedButton/roundedButton";
import { User } from "@/services/fireBase/adminServices/type";

export default function UserForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState<Omit<User, "id">>({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        note: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false); // State để kiểm soát loading

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value || "" }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.first_name.trim()) newErrors.first_name = "First Name is required.";
        if (!formData.last_name.trim()) newErrors.last_name = "Last Name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        if (!formData.phone_number.trim()) newErrors.phone_number = "Phone Number is required.";
        if (!formData.address.trim()) newErrors.address = "Address is required.";
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true); // Bật hiệu ứng loading
        try {
            const res = await fetch("/api/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to send email");
            }

            alert("Your message has been sent!");

            // Reset form
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                address: "",
                note: "",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setLoading(false); // Tắt hiệu ứng loading
        }
    };

    return (
        <div className="flex items-center justify-center p-4 w-full">
            <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="shadow-lg rounded-lg p-4 w-full max-w-2xl space-y-4 border"
            >
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1">
                        <UserInput
                            label="First Name"
                            name="first_name"
                            value={formData.first_name}
                            placeholder="Enter your first name"
                            required
                            onChange={handleChange}
                            error={errors.first_name}
                        />
                    </div>
                    <div className="flex-none" style={{ width: "20px", height: "10px" }}></div>
                    <div className="flex-1">
                        <UserInput
                            label="Last Name"
                            name="last_name"
                            value={formData.last_name}
                            placeholder="Enter your last name"
                            required
                            onChange={handleChange}
                            error={errors.last_name}
                        />
                    </div>
                </div>
                <UserInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    required
                    onChange={handleChange}
                    error={errors.email}
                />
                <UserInput
                    label="Phone Number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    placeholder="Enter your phone number"
                    required
                    onChange={handleChange}
                    error={errors.phone_number}
                />
                <UserInput
                    label="Address"
                    name="address"
                    value={formData.address}
                    placeholder="Enter your address"
                    required
                    onChange={handleChange}
                    error={errors.address}
                />
                <UserInput
                    label="Message"
                    name="note"
                    value={formData.note || ""}
                    placeholder="Leave us a message..."
                    onChange={handleChange}
                    error={errors.note}
                />
                <div className="text-center">
                    <RoundedButton
                        label={loading ? <ClipLoader size={20} color="#fff" /> : "Send"}
                        effect="scale"
                        onClick={handleSubmit}
                        disabled={loading} // Disable nút khi đang loading
                    />
                </div>
            </motion.form>
        </div>
    );
}
