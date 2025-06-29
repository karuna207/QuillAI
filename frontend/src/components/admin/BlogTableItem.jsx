import React from 'react';
import { assets } from '../../assets/assets';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt);

  return (
    <tr className="border-b hover:bg-gray-50">
      <th className="px-4 py-3 text-sm text-gray-700">{index}</th>

      <td className="px-4 py-3 text-sm font-medium text-gray-800">{title}</td>

      <td className="px-4 py-3 text-sm text-gray-600">
        {blogDate.toDateString()}
      </td>

      <td className="px-4 py-3 text-sm font-semibold">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            blog.isPublished
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`}
        >
          {blog.isPublished ? 'Published' : 'Unpublished'}
        </span>
      </td>

      <td className="px-4 py-3 flex items-center gap-2">
        <button
          className={`px-3 py-1 text-xs font-medium rounded-full transition duration-200 cursor-pointer ${
            blog.isPublished
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {blog.isPublished ? 'Unpublish' : 'Publish'}
        </button>

        <img
          src={assets.cross_icon}
          alt="Delete"
          className="w-5 h-5 cursor-pointer hover:scale-110 transition"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
