import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import Navbar from '../components/Navbar';
import moment from 'moment/moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';

const Blog = () => {
    const { id } = useParams();
    const { axios } = useAppContext();

    const [blogData, setblogData] = useState(null);
    const [comments, setcomments] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const [speechStatus, setSpeechStatus] = useState('stopped'); // 'playing', 'paused', 'stopped'
    const utteranceRef = useRef(null);
    const blogRef = useRef(null);

    const downloadPDF = async () => {
        try {
            const response = await axios.get(`/generate-pdf?id=${id}`, {
                responseType: 'blob', // Important for handling binary data
            });

            // Create a link and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `blog-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('PDF download failed:', error);
        }
    };



    const stripHtml = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    };


    const speakText = (htmlText) => {
        if (!window.speechSynthesis) {
            alert('Sorry, your browser does not support text-to-speech.');
            return;
        }

        const plainText = stripHtml(htmlText);

        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.lang = 'en-US';
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.volume = 1;

        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(voice => voice.lang === 'en-US');
        if (selectedVoice) utterance.voice = selectedVoice;

        utterance.onend = () => setSpeechStatus('stopped');

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setSpeechStatus('playing');
    };



    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            data.success ? setblogData(data.blog) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await axios.post(`/api/blog/comments`, { blogId: id });
            if (data.success) {
                setcomments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/blog/add-comment', {
                blog: id,
                name,
                content
            });
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
            <img
                src={assets.gradientBackground}
                alt=""
                className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10"
            />

            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <p className="text-sm text-gray-500 mb-2">
                    Published on {moment(blogData.createdAt).format('MMMM Do, YYYY')}
                </p>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{blogData.title}</h1>
                <h2 className="text-xl text-gray-700 mb-2">{blogData.subTitle}</h2>

                {/* ✅ Buttons with spacing */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <button
                        onClick={() => speakText(blogData.description)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Text to Speech
                    </button>

                    {speechStatus === 'playing' && (
                        <button
                            onClick={() => {
                                window.speechSynthesis.pause();
                                setSpeechStatus('paused');
                            }}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                        >
                            Pause
                        </button>
                    )}

                    {speechStatus === 'paused' && (
                        <button
                            onClick={() => {
                                window.speechSynthesis.resume();
                                setSpeechStatus('playing');
                            }}
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                        >
                            Resume
                        </button>
                    )}

                    {speechStatus !== 'stopped' && (
                        <button
                            onClick={() => {
                                window.speechSynthesis.cancel();
                                setSpeechStatus('stopped');
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Stop
                        </button>
                    )}

                    <button
                        onClick={downloadPDF}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Download as PDF
                    </button>
                </div>



                <p className="text-base text-gray-600 mb-8">
                    By <span className="font-semibold text-gray-800">Michael Brown</span>
                </p>

                <img
                    src={blogData.image}
                    alt="Thumbnail"
                    className="w-full h-auto rounded-lg mb-8 shadow-md"
                />

                <div className="rich-text text-[15px] leading-relaxed text-gray-800">
                    <div ref={blogRef} dangerouslySetInnerHTML={{ __html: blogData.description }}></div>

                    {/* Comments */}
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

                    {/* Add Comment */}
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

                    {/* Share */}
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
