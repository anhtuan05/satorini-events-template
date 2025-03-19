// types.ts
export interface User {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    address: string;
    note?: string;
}

export interface Project {
    id: string;
    file: string;
    title: string;
    content: string;
    linking?: string;
    start_date: string;
    end_date: string;
    status: string;
    public_id_cloudinary: string;
}

export interface Image {
    id: string;
    file: string;
    title: string;
    description?: string;
    tagname?: string;
    public_id_cloudinary: string;
}
