import { useEffect, useState } from 'react';
import { fetchAllBlogs, fetchBlogById } from '../api';

export default function BlogHistory({ onSelectBlog }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const data = await fetchAllBlogs();
                setBlogs(data);
            } catch (error) {
                console.error('Failed to fetch history', error);
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    const handleSelect = async (id) => {
        setSelectedId(id);
        try {
            const blog = await fetchBlogById(id);
            onSelectBlog(blog);
        } catch (error) {
            console.error('Failed to fetch blog details', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No blogs generated yet.</p>
                <p className="text-sm mt-1">Create your first blog using the form.</p>
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {blogs.map((blog) => (
                <li key={blog.id}>
                    <button
                        onClick={() => handleSelect(blog.id)}
                        className={`w-full text-left p-3 rounded-lg transition ${
                            selectedId === blog.id
                                ? 'bg-blue-50 border border-blue-200'
                                : 'hover:bg-gray-50 border border-transparent'
                        }`}
                    >
                        <div className="font-medium text-gray-900 truncate">{blog.title}</div>
                        <div className="text-sm text-gray-500 mt-1">
                            {new Date(blog.created_at).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 truncate">
                            Topic: {blog.topic}
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    );
}