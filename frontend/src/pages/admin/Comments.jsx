import React, { useEffect, useState } from 'react';
import { comments_data } from '../../assets/assets';
import CommentTableItem from '../../components/admin/CommentTableItem';

const Comments = () => {
  const [comments, setcomments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  const fetchComments = async () => {
    setcomments(comments_data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Comments</h1>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('Approved')}
            className={`px-5 py-2 rounded-md text-white text-sm font-medium ${
              filter === 'Approved' ? 'bg-green-600' : 'bg-gray-400'
            } hover:bg-green-700 transition`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter('Not Approved')}
            className={`px-5 py-2 rounded-md text-white text-sm font-medium ${
              filter === 'Not Approved' ? 'bg-red-600' : 'bg-gray-400'
            } hover:bg-red-700 transition`}
          >
            Not Approved
          </button>
        </div>

        {/* Comments Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 border">Blog Title & Comment</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100 text-sm">
              {comments
                .filter((comment) =>
                  filter === 'Approved'
                    ? comment.isApproved === true
                    : comment.isApproved === false
                )
                .map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComment={fetchComments}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comments;
