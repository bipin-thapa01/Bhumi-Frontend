"use client";

import Loading from "@/utils/loading";
import { showSnackbar } from "@/utils/snackbar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Nav from "../nav";
import StatusCard from "./statusCard";
import Form from "./form";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [st, setSt] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const status = ['ACTIVE LISTINGS', 'TOTAL VIEWS', 'INQUIRIES', 'SOLD THIS YEAR'];

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'token': token
        })
      });
      const data = await res.json();
      if (data?.success) {
        const email = data?.user?.email;
        const res2 = await fetch('http://localhost:8000/api/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'email': email
          }
        });
        const data2 = await res2.json();
        if (data2?.success) {
          setUser(data2.user);
          setPosts(data2.posts);
        } else {
          showSnackbar({ type: 'error', title: "Error", message: "Login to access dashboard" });
          router.push('/login');
        }
        setIsLogin(true);
      } else {
        showSnackbar({ type: 'error', title: "Error", message: "Login to access dashboard" });
        router.push('/login');
      }
      setIsLoading(false);
    } catch (err) {
      showSnackbar({ type: 'error', title: "Error", message: err.message });
      setIsLoading(false);
    }
  }

  const fetchStatusData = async () => {
    const activeListing = posts.length;
    let totalViews = 0;
    for (let post in posts) {
      totalViews += post?.views ?? 0;
    }
    let inquiries = 0;
    let annualSale = 0;
    setSt([activeListing, totalViews, inquiries, annualSale]);
  }

  useEffect(() => {
    fetchDashboard();
  }, [pathname]);

  useEffect(()=>{
    fetchStatusData();
  },[posts]);

  if (isLoading) {
    return <Loading />
  }

  return <div className="w-full h-full relative custom-padding xl:px-50 px-4">
    <Nav isLogin={isLogin} user={user} isDashboard={true} />
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-bold text-gray-400">Vendor Dashboard</div>
          <div className="text-gray-400 text-sm">Manage your land listings and inquiries</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {
          status.map((item, index) => {
            return <StatusCard title={item} key={index} data={st[index]} />;
          })
        }
      </div>
      <div className="bg-surface p-2 rounded-lg flex items-center justify-between">
        <div className="text-xl font-bold text-gray-400">My Listings</div>
        <div className="text-black hover:bg-gray-400 bg-gray-300 px-6 rounded-md cursor-pointer" onClick={() => setIsFormOpen(prev => !prev)}>Add</div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left text-sm text-gray-400 font-medium">
              <th className="pb-3 pr-4 w-1/6">Name</th>
              <th className="pb-3 pr-4 w-1/6">Status</th>
              <th className="pb-3 pr-4 w-1/6">Role</th>
              <th className="pb-3 pr-4 w-1/6">Department</th>
              <th className="pb-3 pr-4 w-1/6">Joined</th>
              <th className="pb-3 w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-50">
            {/* {rows.map((row, i) => ( */}
            <tr className="hover:bg-surface transition-colors">
              <td className="py-3 pr-4 truncate">Alice Johnson</td>
              <td className="py-3 pr-4 truncate">Active</td>
              <td className="py-3 pr-4 truncate">Engineer</td>
              <td className="py-3 pr-4 truncate">Product</td>
              <td className="py-3 pr-4 truncate">Jan 2023</td>
              <td className="py-3 truncate">Edit</td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>

    <div
        onClick={() => setIsFormOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${isFormOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
    <Form isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}/>
  </div>

}