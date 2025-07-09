import React, { useState, useEffect } from 'react';
import { assets, dashboard_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard');
      if (data.success) {
        setDashboardData({
          blogs: data.dashboardData.blogCount,
          comments: data.dashboardData.commentCount,
          drafts: data.dashboardData.draftCount,
          recentBlogs: data.dashboardData.recentBlogs
        });
  
      } else {
        
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blogs */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow">
          <img src={assets.dashboard_icon_1} alt="Blogs" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-bold">{dashboardData.blogs}</p>
            <p className="text-gray-500">Blogs</p>
          </div>
        </div>

        {/* Comments */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow">
          <img src={assets.dashboard_icon_2} alt="Comments" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-bold">{dashboardData.comments}</p>
            <p className="text-gray-500">Comments</p>
          </div>
        </div>

        {/* Drafts */}
        <div className="flex items-center p-4 bg-white rounded-xl shadow">
          <img src={assets.dashboard_icon_3} alt="Drafts" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-bold">{dashboardData.drafts}</p>
            <p className="text-gray-500">Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center mb-4">
          <img src={assets.dashboard_icon_4} alt="Latest Blogs" className="w-6 h-6 mr-2" />
          <p className="text-xl font-semibold">Latest Blogs</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Blog Title</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => {
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
