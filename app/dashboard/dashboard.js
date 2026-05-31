"use client";

import Loading from "@/utils/loading";
import { showSnackbar } from "@/utils/snackbar";
import {useState, useEffect} from 'react';
import { useRouter, usePathname } from "next/navigation";
import Nav from "../nav";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    fetchDashboard();
  }, [pathname])

  if (isLoading) {
    return <Loading />
  }

  return <div className="w-full h-full relative custom-padding xl:px-50 px-4">
    <Nav isLogin={isLogin} user={user} isDashboard={true}/>
    <div className="">
      <div className="text-lg font-bold text-gray-400">Vendor Dashboard</div>
    </div>
  </div>

}