import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { addUser } from "@/services/fireBase/adminServices/dbServices";
import { User } from "@/services/fireBase/adminServices/type";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { first_name, last_name, email, phone_number, address, note } = body as Omit<User, "id">;

        if (!first_name || !last_name || !email || !phone_number || !address) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Gửi email bằng Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Contact Form Submission",
            text: `
                Name: ${first_name} ${last_name}
                Email: ${email}
                Phone: ${phone_number}
                Address: ${address}
                Note: ${note || "N/A"}
            `,
        };

        await transporter.sendMail(mailOptions);

        // Lưu vào Firestore
        await addUser({ first_name, last_name, email, phone_number, address, note });

        return NextResponse.json({ message: "Email sent and user added successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
