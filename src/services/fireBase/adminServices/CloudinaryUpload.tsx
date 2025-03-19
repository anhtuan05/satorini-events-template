import { useState } from "react";
import { Image } from "@/services/fireBase/adminServices/type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud, RefreshCw } from "lucide-react";

interface CloudinaryUploadProps {
    onUpload: (imageData: Image) => void;
}

export default function CloudinaryUpload({ onUpload }: CloudinaryUploadProps) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tagname, setTagname] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setTagname("");
        setFile(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        if (!cloudName) {
            console.error("Cloudinary cloud name is missing.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!data.secure_url || !data.public_id) {
                console.error("Error: Cloudinary upload failed, no secure_url or public_id.");
                setLoading(false);
                return;
            }

            const imageData: Image = {
                id: "",
                file: data.secure_url,
                title,
                description,
                tagname,
                public_id_cloudinary: data.public_id,
            };

            onUpload(imageData);
            resetForm();
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 space-y-4 p-4 border rounded-lg shadow-sm">
            <Input type="text" placeholder="Enter image title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input type="text" placeholder="Enter tagname" value={tagname} onChange={(e) => setTagname(e.target.value)} />
            <Input type="file" onChange={handleFileChange} disabled={loading} />
            <div className="flex gap-2">
                <Button onClick={handleUpload} disabled={loading || !file} className="flex items-center gap-1">
                    <UploadCloud size={16} /> Upload
                </Button>
                <Button onClick={resetForm} variant="outline" className="flex items-center gap-1">
                    <RefreshCw size={16} /> Reset
                </Button>
            </div>
            {loading && <p className="text-sm text-gray-500">Uploading...</p>}
        </div>
    );
}