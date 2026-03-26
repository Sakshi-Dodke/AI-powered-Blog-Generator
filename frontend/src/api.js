import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/blogs';

export const generateBlog = async (data) => {
    const response = await axios.post(`${API_BASE}/generate`, data);
    return response.data;
};

export const fetchAllBlogs = async () => {
    const response = await axios.get(API_BASE);
    return response.data;
};

export const fetchBlogById = async (id) => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
};