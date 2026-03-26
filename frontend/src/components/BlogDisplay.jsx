import ReactMarkdown from 'react-markdown';

export default function BlogDisplay({ blog, onCopy, onDownload }) {
    if (!blog) return null;

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">{blog.title}</h2>
                <p className="text-gray-600 mt-2 italic">{blog.metaDescription}</p>
            </div>

            <div className="prose prose-blue max-w-none">
                <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                    onClick={onCopy}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                </button>
                <button
                    onClick={onDownload}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download as Markdown
                </button>
            </div>
        </div>
    );
}