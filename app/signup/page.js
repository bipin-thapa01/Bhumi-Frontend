"use client";

import { showSnackbar } from "@/utils/snackbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Signup() {
  const router = useRouter();

  useEffect(
    () => {
    }
    , []);

  let createAccount = async (e) => {
    e.preventDefault();
    let form = document.getElementById('signup-form');
    let formData = new FormData(form);

    let name = formData.get('firstName') + " " + formData.get('lastName');
    let email = formData.get('email');
    let phone = formData.get('phone');
    let password = formData.get('password');
    let role = formData.get('accountType');

    if (name == '' || email == '' || phone == '' || password == '' || role == '') {
      showSnackbar({type: "warning", title:"Warning" ,message: "All the fields must be filled!"});
      return;
    }

    if(password.length < 8){
      showSnackbar({type: "warning", title:"Warning" ,message: "Password must have 8 or more characters!"});
      return;
    }

    if (phone.length != 10) {
      showSnackbar({type: "warning", title:"Warning" ,message: "Invalid Number!"});
      return;
    }

    document.getElementById('signup-button').innerText = "Creating...";

    try {
      let res = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'name': name,
          'email': email,
          'phone': phone,
          'password': password,
          'role': role,
        })
      });
      let data = await res.json();
      console.log(data);
      if (data.success) {
        document.getElementById('signup-button').innerText = "Create Account";
        showSnackbar({type: "success", title:"Success" ,message: "Your account has been created!"});
        router.push("/login");
      } else {
        document.getElementById('signup-button').innerText = "Create Account";
        let message = data.message;
        showSnackbar({type: "error", title:"Error" ,message: message});
      }
    } catch (err) {
      document.getElementById('signup-button').innerText = "Create Account";
      showSnackbar({type: "error", title:"Error" ,message: err.message});
    }
  }

  return <div className="w-screen h-screen flex justify-center items-center bg-background">
    <form id="signup-form" className=" pt-4 pb-8 sm:w-120 w-[96%] rounded-xl flex flex-col justify-center bg-surface border-border border" onSubmit={createAccount}>
      <p className="text-center text-2xl mt-8 font-bold">Welcome to Bhumi</p>
      <div className="flex justify-around rounded-md w-[70%] ml-[15%] mt-6 bg-secondary border-card p-0.5">
        <div className="text-center pl-2 pr-2 pt-1 pb-1 rounded-md cursor-pointer w-[50%]" onClick={() => router.push('/login')}>Log in</div>
        <div className="text-center w-[50%] pl-2 pr-2 pt-1 pb-1 rounded-md cursor-pointer bg-brand-foreground text-black" onClick={() => router.push('/signup')}>Sign up</div>
      </div>
      <div className="pt-8 pl-8 pr-8">
        <div className="flex">
          <div className="flex flex-col mr-2">
            <label className=" text-xs">First Name</label>
            <input type="text" name="firstName" placeholder="Ram" className="px-3 py-1 mt-2 rounded-md w-full border-border border-2 outline-0 bg-background"></input>
          </div>
          <div className="flex flex-col">
            <label className=" text-xs">Last Name</label>
            <input type="text" name="lastName" placeholder="Sharma" className="border-border border-2 px-3 py-1 mt-2 rounded-md outline-0 w-full bg-background"></input>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className=" text-xs">Email address</label>
          <input type="email" name="email" className="border-border border-2 px-3 py-1 mt-2 rounded-md outline-0 bg-background" placeholder="you@example.com"></input>
        </div>
        <div className="flex flex-col mt-4">
          <label className=" text-xs">Phone</label>
          <input type="text" name="phone" className="border-border border-2 px-3 py-1 mt-2 rounded-md outline-0 bg-background" placeholder="98/97XXXXXXXX"></input>
        </div>
        <div className="flex flex-col mt-4">
          <label className=" text-xs">Password</label>
          <input type="password" name="password" placeholder="Min. 8 characters" className="border-border border-2 px-3 py-1 mt-2 rounded-md outline-0 bg-background"></input>
        </div>
        <div className="flex flex-col gap-y-2 mt-4">
          <label className=" text-xs">Account Type</label>
          <select name="accountType" className="rounded-md px-2 border-border border-2 py-1 bg-background">
            <option value={"buyer"}>Buyer</option>
            <option value={"seller"}>Seller</option>
          </select>
        </div>
        <div className="mt-4 flex justify-center">
          <button id="signup-button" className="px-8 py-2 bg-white text-background rounded-md cursor-pointer">Create Account</button>
        </div>
      </div>
    </form>
  </div>
}