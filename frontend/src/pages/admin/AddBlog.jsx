import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';

const AddBlog = () => {
  const editorref = useRef();
  const quillref = useRef();

  const [Thumbnail, setthumbnail] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setsubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPublished, setisPublished] = useState(false);

  const generateContent = async () => {
    // Placeholder for future AI content generation
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Placeholder for form submission
  };

  useEffect(() => {
    if (!quillref.current && editorref.current) {
      quillref.current = new Quill(editorref.current, { theme: 'snow' });
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">Add New Blog</h1>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        <div>
          <label htmlFor="file" className="block font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="file"
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Subtitle</label>
          <input
            type="text"
            onChange={(e) => setsubTitle(e.target.value)}
            value={subtitle}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Blog Description</label>
          <div className="border border-gray-300 rounded-md mb-2">
            <div ref={editorref} className="min-h-[200px] p-2" />
          </div>
          <button
            type="button"
            onClick={generateContent}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Generate with AI
          </button>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Blog Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Category</option>
            {blogCategories.map((cat, index) => (
              <option value={cat} key={index}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setisPublished(e.target.checked)}
            className="h-5 w-5 text-blue-600"
          />
          <label className="text-gray-700 font-medium">Publish Now</label>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
