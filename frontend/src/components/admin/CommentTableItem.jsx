import React from 'react';
import { assets } from '../../assets/assets'; 
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const CommentTableItem = ({ comment, fetchComment, index }) => {
  const { blog, createdAt, _id } = comment;
  const blogDate = new Date(createdAt);  
  const {axios}=useAppContext(); 

  const approveComment=async()=>{
    try {
      const {data}=await axios.post('/api/admin/approve-comment',{id:_id}); 
      if(data.success){
        toast.success(data.message);
        await fetchComment();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteComment=async()=>{
    try {  
      const confirm=window.confirm("Are you sure that you want to delete this comment?");
      if(!confirm){
        return;
      }
      const {data}=await axios.post('/api/admin/delete-comment',{id:_id}); 
      if(data.success){
        toast.success("Blog deleted successfully");
        await fetchComment();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

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
              onClick={approveComment}
              alt="Approve"
              className="w-5 h-5 cursor-pointer hover:scale-110 transition"
            />
          ) : (
            <span className="text-green-600 font-medium">Approved</span>
          )}
          <img
            src={assets.bin_icon} 
            onClick={deleteComment}
            alt="Delete"
            className="w-5 h-5 cursor-pointer hover:scale-110 transition"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
