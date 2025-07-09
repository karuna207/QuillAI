import React, { useEffect, useState } from 'react';
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';

const ListBlog = () => {
  const [blogData, setblogData] = useState([]); 
  const {axios}=useAppContext();

  const fetchBlogs = async () => {
    try {
      const {data}=await axios.get('/api/admin/blogs'); 
      if(data.success){
        setblogData(data.blogs);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">All Blogs</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border font-medium text-gray-600">#</th>
              <th className="px-4 py-3 border font-medium text-gray-600">Blog Title</th>
              <th className="px-4 py-3 border font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 border font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 border font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {blogData.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchBlogs}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
