import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Cấu hình Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Xử lý request DELETE
export async function DELETE(req: Request) {
    try {
        const { publicId } = await req.json();

        if (!publicId) {
            return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
        }

        await cloudinary.v2.uploader.destroy(publicId);
        return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }
}
