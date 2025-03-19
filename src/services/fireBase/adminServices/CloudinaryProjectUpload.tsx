import { useState } from "react";
import { Project } from "@/services/fireBase/adminServices/type";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

interface CloudinaryProjectUploadProps {
    onUpload: (projectData: Project) => void;
}

export default function CloudinaryProjectUpload({ onUpload }: CloudinaryProjectUploadProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        linking: "",
        start_date: "",
        end_date: "",
        status: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0] || null);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setError("");

        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        if (!cloudName || !uploadPreset) {
            setError("Cloudinary configuration missing.");
            setLoading(false);
            return;
        }

        try {
            const fileData = new FormData();
            fileData.append("file", file);
            fileData.append("upload_preset", uploadPreset);

            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: fileData,
            });

            const data = await res.json();
            if (!data.secure_url || !data.public_id) {
                setError("Upload failed. Please try again.");
                setLoading(false);
                return;
            }

            onUpload({
                id: data.public_id,
                file: data.secure_url,
                ...formData,
                public_id_cloudinary: data.public_id,
            });

            handleReset();
        } catch (error) {
            setError("Upload failed. Please check console.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            title: "",
            content: "",
            linking: "",
            start_date: "",
            end_date: "",
            status: "",
        });
        setFile(null);
        setError("");
    };

    return (
        <Card className="p-4 space-y-4">
            <Label>Project Title</Label>
            <Input type="text" name="title" value={formData.title} onChange={handleChange} />

            <Label>Project Content</Label>
            <Textarea name="content" value={formData.content} onChange={handleChange} />

            <Label>Project Link (Optional)</Label>
            <Input type="text" name="linking" value={formData.linking} onChange={handleChange} />

            <Label>Start Date</Label>
            <Input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />

            <Label>End Date</Label>
            <Input type="date" name="end_date" value={formData.end_date} onChange={handleChange} />

            <Label>Project Status</Label>
            <Input type="text" name="status" value={formData.status} onChange={handleChange} />

            <Label>Upload Image</Label>
            <Input type="file" accept="image/*" onChange={handleFileSelect} className="w-full" />

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex gap-2">
                <Button onClick={handleUpload} disabled={loading}>
                    {loading ? <ClipLoader size={20} color="#fff" /> : <UploadCloud className="mr-2" />}
                    {loading ? "Uploading..." : "Submit Upload"}
                </Button>
                <Button variant="secondary" onClick={handleReset} disabled={loading}>Reset Form</Button>
            </div>
        </Card>
    );
}
