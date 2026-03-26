import { useState } from 'react';
import BlogForm from './components/BlogForm';
import BlogDisplay from './components/BlogDisplay';
import BlogHistory from './components/BlogHistory';
import { generateBlog as generateBlogApi } from './api';

function App() {
    const [currentBlog, setCurrentBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async (formData) => {
        setLoading(true);
        setError('');
        try {
            const newBlog = await generateBlogApi(formData);
            setCurrentBlog(newBlog);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to generate blog');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!currentBlog) return;
        const text = `# ${currentBlog.title}\n\n${currentBlog.metaDescription}\n\n${currentBlog.content}`;
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const downloadMarkdown = () => {
        if (!currentBlog) return;
        const text = `# ${currentBlog.title}\n\n${currentBlog.metaDescription}\n\n${currentBlog.content}`;
        const blob = new Blob([text], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentBlog.title.replace(/[^a-z0-9]/gi, '_')}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">AI Blog Generator</h1>
                    <p className="text-gray-600 mt-1">Create SEO‑optimized blog content with AI</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <BlogForm onGenerate={handleGenerate} loading={loading} />
                            {error && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Generated Blog */}
                        {currentBlog && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <BlogDisplay
                                    blog={currentBlog}
                                    onCopy={copyToClipboard}
                                    onDownload={downloadMarkdown}
                                />
                            </div>
                        )}
                    </div>

                    {/* History Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Blogs</h2>
                            <BlogHistory onSelectBlog={setCurrentBlog} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;