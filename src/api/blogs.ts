import { apiRequest } from "./client";

export interface Blog {
    id?: number;
    title: string;
    content: string;
    author: string;
}

export function getBlogs() {
    return apiRequest<Blog[]>("/blogs");
}

export function getBlogById(id: string) {
    return apiRequest<Blog>(`/blogs/${id}`);
}

export function createBlog(blog: Blog) {
    return apiRequest<Blog>("/blogs", {
        method: "POST",
        body: JSON.stringify(blog),
    });
}
