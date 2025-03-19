import { db } from "@/services/fireBase/configFirebase";
import { User, Project, Image } from "@/services/fireBase/adminServices/type";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";

const usersCollection = collection(db, "Users");
const projectsCollection = collection(db, "Projects");
const imagesCollection = collection(db, "Images");

// Get all users
export async function getUsers(): Promise<User[]> {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            phone_number: data.phone_number || "",
            email: data.email || "",
            address: data.address || "",
            note: data.note || "",
        };
    });
}

// Add a new user
export async function addUser(user: Omit<User, "id">): Promise<void> {
    await addDoc(usersCollection, user);
}

// Delete a user
export async function deleteUser(id: string): Promise<void> {
    await deleteDoc(doc(db, "Users", id));
}

// Update a user
export async function updateUser(id: string, user: Partial<Omit<User, "id">>): Promise<void> {
    await updateDoc(doc(db, "Users", id), user);
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
    const snapshot = await getDocs(projectsCollection);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            file: data.file || "",
            title: data.title || "",
            content: data.content || "",
            linking: data.linking || "",
            start_date: data.start_date,
            end_date: data.end_date,
            status: data.status || "",
            public_id_cloudinary: data.public_id_cloudinary,
        };
    });
}

// Add a new project
export async function addProject(project: Omit<Project, "id">): Promise<void> {
    await addDoc(projectsCollection, project);
}

// Delete a project
export async function deleteProject(id: string): Promise<void> {
    await deleteDoc(doc(db, "Projects", id));
    //add deleteImg on Cloudinary
}

// Update a project
export async function updateProject(id: string, project: Partial<Omit<Project, "id">>): Promise<void> {
    await updateDoc(doc(db, "Projects", id), project);
}

// Get all images
export async function getImages(): Promise<Image[]> {
    const snapshot = await getDocs(imagesCollection);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            file: data.file || "",
            title: data.title || "",
            description: data.description || "",
            tagname: data.tagname || "",
            public_id_cloudinary: data.public_id_cloudinary,
        };
    });
}

// Add a new image
export async function addImage(image: Omit<Image, "id">): Promise<void> {
    await addDoc(imagesCollection, image);
}

// Delete an image
export async function deleteImage(id: string): Promise<void> {
    await deleteDoc(doc(db, "Images", id));
}

// Update an image
export async function updateImage(id: string, image: Partial<Omit<Image, "id">>): Promise<void> {
    await updateDoc(doc(db, "Images", id), image);
}
