"use client";

import { showSnackbar } from "@/utils/snackbar";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    document.getElementById('login-button').innerText = 'Checking...';
    const form = document.getElementById("login-form");
    let formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      if (email == '' || password == '') {
        showSnackbar({ type: "warning", title: "Warning", message: "All the fields must be filled!" });
        return;
      }
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'password': password
        })
      });
      const data = await res.json();
      if(data.success){
        localStorage.setItem('token', data.token);
        console.log(data);
        showSnackbar({type: "success", title:"Success" ,message: "Login Successful!"});
        document.getElementById('login-button').innerText = 'Login';
        if(data.user.role === 'seller' || data.user.role === 'buyer'){
          router.push('/');
        } else if(data.user.role === 'admin'){

        }
      } else {
        let message = data.message;
        showSnackbar({type: "error", title:"Error" ,message: message});
        document.getElementById('login-button').innerText = 'Login';
      }
    } catch (err) {
      showSnackbar({type: "error", title: "Error", message: err.message});
      document.getElementById('login-button').innerText = 'Login';
    }
  }

  return <div className="w-screen h-screen flex justify-center items-center bg-background">
    <form id="login-form" className=" pt-4 pb-8 sm:w-120 w-[96%] rounded-xl flex flex-col justify-center bg-surface border-border border" onSubmit={login}>
      <p className="text-center text-2xl mt-8 font-bold">Welcome to Bhumi</p>
      <div className="flex justify-around rounded-md w-[70%] ml-[15%] mt-6 bg-secondary border-card p-0.5">
        <div className="text-center pl-2 pr-2 pt-1 pb-1 rounded-md cursor-pointer w-[50%] bg-brand-foreground text-black" onClick={() => router.push('/login')}>Log in</div>
        <div className="text-center w-[50%] pl-2 pr-2 pt-1 pb-1 rounded-md cursor-pointer" onClick={() => router.push('/signup')}>Sign up</div>
      </div>
      <div className="pt-8 pl-8 pr-8">
        <div className="flex flex-col">
          <label className=" text-xs">Email address</label>
          <input type="email" name="email" className="border-border bg-background border-2 px-3 py-1 mt-2 rounded-md outline-0" placeholder="you@example.com"></input>
        </div>
        <div className="flex flex-col mt-4">
          <label className=" text-xs">Password</label>
          <input type="password" name="password" placeholder="Min. 8 characters" className="border-border bg-background border-2 px-3 py-1 mt-2 rounded-md outline-0"></input>
        </div>
        <div className=" text-xs mt-4 hover:cursor-pointer text-brand">Forgot Password?</div>
        <div className="mt-4 flex justify-center">
          <button id="login-button" className="px-8 py-2 bg-white text-background rounded-md cursor-pointer">Login</button>
        </div>
      </div>
    </form>
  </div>
}