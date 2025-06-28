import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { title, description, image, category, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="cursor-pointer bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-lg duration-300 w-full max-w-sm"
    >
      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Blog Content */}
      <div className="p-4 flex flex-col gap-2">
        <span className="text-sm font-semibold text-blue-500 uppercase">{category}</span>

        <h5 className="text-lg font-bold text-gray-900">{title}</h5>

        <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{"__html":description.slice(0,80)}}></p>
      </div>
    </div>
  );
};

export default BlogCard;
