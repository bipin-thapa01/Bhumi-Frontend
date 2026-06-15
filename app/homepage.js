"use client";

import Nav from "@/app/nav";
import Loading from "@/utils/loading";
import { showSnackbar } from "@/utils/snackbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const verifyLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
      });
      const data = await res.json();
      if (data.success) {
        const email = data.user.email;
        const res2 = await fetch('http://localhost:8000/api/home', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'email': email,
          }
        });
        const data2 = await res2.json();
        if (data2.success) {
          setUser(data2.user);
          setPosts(data2.posts);
          setIsLogin(true);
        } else {
          showSnackbar({ type: 'error', title: "Error", message: "Session time out or error!" });
          router.push('/login');
        }
      } else {
        showSnackbar({ type: 'error', title: "Error", message: "Session time out or error!" });
        router.push('/login');
      }
      setIsLoading(false);
    } catch (err) {
      showSnackbar({ type: 'error', title: "Error", message: err.message });
      router.push('/login');
    }
  }

  useEffect(() => {
    verifyLogin();
  }, [])

  if (isLoading) {
    return <Loading />;
  }

  return <div className="w-full h-full relative custom-padding xl:px-50 px-4">
    <Nav isLogin={isLogin} user={user}></Nav>
    <div className="pt-10">
      <div className="font-bold sm:text-4xl text-3xl">Find verified land across</div>
      <div className="text-brand font-bold sm:text-4xl text-3xl">all 77 districts</div>
      <div className="pt-3 text-gray-400 sm:text-md text-sm">Browse thousands of listings with real coordinates, ownership documents, and verified agents. No middlemen, no scams.</div>
    </div>
    <div className="mt-8">
      <div className="font-bold">Featured Listings</div>
      {
        posts.length == 0 ? 
        <div className="text-gray-400 w-full text-center mt-8 font-bold">Empty Post List</div>  : 
        null
      }
    </div>
  </div>
}