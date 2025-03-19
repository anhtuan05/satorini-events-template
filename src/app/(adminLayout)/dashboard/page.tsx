"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/services/fireBase/adminServices/AuthContext";
import AdminRoute from "@/services/fireBase/adminServices/AdminRoute";
import { redirect } from "next/navigation";
import {
    getUsers, getProjects, getImages,
    addImage, deleteUser, deleteProject, deleteImage, addProject
} from "@/services/fireBase/adminServices/dbServices";
import CloudinaryUpload from "@/services/fireBase/adminServices/CloudinaryUpload";
import { User, Project, Image } from "@/services/fireBase/adminServices/type";
import CloudinaryProjectUpload from "@/services/fireBase/adminServices/CloudinaryProjectUpload";


export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const [activeTab, setActiveTab] = useState<"users" | "projects" | "images">("users");

    useEffect(() => {
        async function fetchData() {
            setUsers(await getUsers());
            setProjects(await getProjects());
            setImages(await getImages());
        }
        fetchData();
    }, []);

    const handleLogout = async () => {
        await logout();
        redirect("/signin");
    };

    const handleDeleteImage = async (imageId: string, publicId: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            // Xóa trên Cloudinary
            const response = await fetch("/api/cloudinaryDeleteImage", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ publicId }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Failed to delete from Cloudinary");

            // Xóa trên Firestore
            await deleteImage(imageId);
            setImages(await getImages());

            alert("Image deleted successfully!");
        } catch (error) {
            console.error("Error deleting image:", error);
            alert("Failed to delete image.");
        }
    };

    const handleDeleteProjectImage = async (projectId: string, publicId: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            // Xóa trên Cloudinary
            const response = await fetch("/api/cloudinaryDeleteImage", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ publicId }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Failed to delete from Cloudinary");

            // Xóa trên Firestore
            await deleteProject(projectId);
            setProjects(await getProjects());

            alert("Image deleted successfully!");
        } catch (error) {
            console.error("Error deleting image:", error);
            alert("Failed to delete image.");
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteUser(userId);
            setUsers(await getUsers());
            alert("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    const formatDay = (dateString: string) => {
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <AdminRoute>
            <div className="p-6 max-w-6xl mx-auto">
                {/* User Info & Logout */}
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pinimg.com/736x/57/b0/23/57b02319a4fadf6e6527407a6bd29f38.jpg"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full border"
                        />
                        <div>
                            <p className="text-lg font-semibold">{user?.displayName || user?.email}</p>
                            <p className="text-sm text-gray-600">Admin Panel</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Logout
                    </button>
                </div>

                {/* Tab Menu */}
                <div className="mt-6 border-b">
                    <nav className="flex space-x-6">
                        {["users", "projects", "images"].map((tab) => (
                            <button
                                key={tab}
                                className={`pb-2 text-lg font-medium ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
                                    }`}
                                onClick={() => setActiveTab(tab as "users" | "projects" | "images")}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="mt-6">
                    {/* Users Management */}
                    {activeTab === "users" && (
                        <section>
                            <h3 className="text-xl font-semibold mb-4">Users Management</h3>
                            <table className="w-full border-collapse border text-left">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="p-2 border">Name</th>
                                        <th className="p-2 border">Email</th>
                                        <th className="p-2 border">Address</th>
                                        <th className="p-2 border">Phone</th>
                                        <th className="p-2 border">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.id} className="border">
                                            <td className="p-2 border">{u.first_name} {u.last_name}</td>
                                            <td className="p-2 border">{u.email}</td>
                                            <td className="p-2 border">{u.address}</td>
                                            <td className="p-2 border">{u.phone_number}</td>
                                            <td className="p-2 border">
                                                <button
                                                    onClick={() => handleDeleteUser(u.id)}
                                                    className="text-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    )}

                    {/* Projects Management */}
                    {activeTab === "projects" && (
                        <section>
                            <h3 className="text-xl font-semibold mb-4">Projects Management</h3>
                            <CloudinaryProjectUpload
                                onUpload={async (projectData) => {
                                    await addProject(projectData);
                                    setProjects(await getProjects())
                                }} />
                            <table className="w-full border-collapse border text-left mt-6">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="p-2 border">Title</th>
                                        <th className="p-2 border">Content</th>
                                        <th className="p-2 border">Start Date</th>
                                        <th className="p-2 border">End Date</th>
                                        <th className="p-2 border">Status</th>
                                        <th className="p-2 border">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((p) => (
                                        <tr key={p.id} className="border">
                                            <td className="p-2 border">{p.title}</td>
                                            <td className="p-2 border">{p.content}</td>
                                            <td className="p-2 border">{formatDay(p.start_date)}</td>
                                            <td className="p-2 border">{formatDay(p.end_date)}</td>
                                            <td className="p-2 border">{p.status}</td>
                                            <td className="p-2 border">
                                                <button
                                                    onClick={() => handleDeleteProjectImage(p.id, p.public_id_cloudinary)}
                                                    className="text-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    )}

                    {/* Images Management */}
                    {activeTab === "images" && (
                        <section>
                            <h3 className="text-xl font-semibold mb-4">Images Management</h3>
                            <CloudinaryUpload
                                onUpload={async (imageData) => {
                                    await addImage(imageData);
                                    setImages(await getImages());
                                }}
                            />
                            <table className="w-full border-collapse border text-left mt-4">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="p-2 border">Title</th>
                                        <th className="p-2 border">Description</th>
                                        <th className="p-2 border">Tag</th>
                                        <th className="p-2 border">Image</th>
                                        <th className="p-2 border">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {images.map((i) => (
                                        <tr key={i.id} className="border">
                                            <td className="p-2 border">{i.title}</td>
                                            <td className="p-2 border">{i.description}</td>
                                            <td className="p-2 border">{i.tagname}</td>
                                            <td className="p-2 border">
                                                <img src={i.file} alt={i.title} className="w-20 h-20 object-cover rounded" />
                                            </td>
                                            <td className="p-2 border">
                                                <button
                                                    onClick={() => handleDeleteImage(i.id, i.public_id_cloudinary)}
                                                    className="text-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </section>
                    )}
                </div>
            </div>
        </AdminRoute>
    );
}
