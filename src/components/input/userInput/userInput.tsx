"use client";

import React from "react";

interface UserInputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export default function UserInput({
    label,
    name,
    type = "text",
    value,
    placeholder = "",
    required = false,
    onChange,
    error,
}: UserInputProps) {
    return (
        <div className="flex flex-col space-y-1">
            <label
                htmlFor={name}
                className="text-sm font-medium"
                style={{ color: "var(--primaryText)" }}
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input 
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                style={{
                    backgroundColor: "var(--inputBg)",
                    color: "var(--primaryText)",
                    borderColor: error ? "red" : "var(--primaryBorder)",
                }}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
