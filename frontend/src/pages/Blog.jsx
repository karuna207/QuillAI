import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import moment from 'moment/moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
    const { id } = useParams();

    const { axios } = useAppContext();
    const [blogData, setblogData] = useState(null);
    const [comments, setcomments] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            data.success ? setblogData(data.blog) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await axios.post(`/api/blog/comments`, { blogId: id })
            if (data.success) {
                setcomments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content })
            if (data.success) {
                toast.success(data.message);
                setName('');
                setContent('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, []);

    return blogData ? (
        <div className="relative bg-white min-h-screen">
            {/* Background Gradient */}
            <img
                src={assets.gradientBackground}
                alt=""
                className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10"
            />

            {/* Navbar */}
            <Navbar />

            {/* Blog Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <p className="text-sm text-gray-500 mb-2">
                    Published on {moment(blogData.createdAt).format('MMMM Do, YYYY')}
                </p>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{blogData.title}</h1>
                <h2 className="text-xl text-gray-700 mb-6">{blogData.subTitle}</h2>

                <p className="text-base text-gray-600 mb-8">
                    By <span className="font-semibold text-gray-800">Michael Brown</span>
                </p>

                {/* Blog Image */}
                <img
                    src={blogData.image}
                    alt="Thumbnail"
                    className="w-full h-auto rounded-lg mb-8 shadow-md"
                />

                {/* Blog Body */}
                <div className="rich-text text-[15px] leading-relaxed text-gray-800">
                    <div dangerouslySetInnerHTML={{ __html: blogData.description }}></div>

                    {/* Comments section */}
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Comments ({comments.length})
                        </h3>

                        <div className="space-y-6">
                            {comments.map((comment, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 rounded-lg p-4 shadow-sm flex gap-4 items-start"
                                >
                                    <img
                                        src={assets.user_icon}
                                        alt="User icon"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="flex flex-col flex-1">
                                        <p className="font-medium text-gray-900">{comment.name}</p>
                                        <p className="text-gray-700">{comment.content}</p>
                                        <span className="text-sm text-gray-500 mt-auto self-end">
                                            {moment(comment.createdAt).fromNow()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Comment Section */}
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Your Comment</h3>
                        <form onSubmit={addComment} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter your Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />

                            <textarea
                                placeholder="Enter comment..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                required
                                rows={4}
                            ></textarea>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Share Section */}
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Share this article</h3>
                        <div className="flex gap-4">
                            <img src={assets.facebook_icon} alt="Facebook" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
                            <img src={assets.twitter_icon} alt="Twitter" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
                            <img src={assets.googleplus_icon} alt="Google Plus" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    ) : (
        <Loader />
    );
};

export default Blog;
