import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt); 
  const {axios}=useAppContext();  

  const togglePublish=async()=>{
    try {
      const {data}=await axios.post('/api/blog/toggle-publish',{id:blog._id});
      if(data.success){
        toast.success(data.message);  
        await fetchBlogs();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteBlog=async ()=>{
    const confirm=window.confirm("Are you sure that you want to delete this blog?") 
    if(!confirm){
      return;
    } 
    
    try {
      const {data}=await axios.post('/api/blog/delete',{id:blog._id}) 
      if(data.success){
        toast.success(data.message);
        await fetchBlogs();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

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
          onClick={togglePublish}
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
          onClick={deleteBlog}
          alt="Delete"
          className="w-5 h-5 cursor-pointer hover:scale-110 transition"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
