import React from 'react';
import { assets } from '../../assets/assets';

const CommentTableItem = ({ comment, fetchComment, index }) => {
  const { blog, createdAt, _id } = comment;
  const blogDate = new Date(createdAt);

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-3 align-top text-sm text-gray-700">
        <div>
          <p className="mb-1">
            <span className="font-semibold text-gray-800">Blog:</span> {blog.title}
          </p>
          <p className="mb-1">
            <span className="font-semibold text-gray-800">Name:</span> {comment.name}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Comment:</span> {comment.content}
          </p>
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-gray-700">
        {blogDate.toLocaleDateString()}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center space-x-4">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              alt="Approve"
              className="w-5 h-5 cursor-pointer hover:scale-110 transition"
            />
          ) : (
            <span className="text-green-600 font-medium">Approved</span>
          )}
          <img
            src={assets.bin_icon}
            alt="Delete"
            className="w-5 h-5 cursor-pointer hover:scale-110 transition"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
