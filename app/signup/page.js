"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

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
      toast.error("Any of the field must not be empty");
      return;
    }

    if (phone.length == 10) {
      toast.error("Invalid number");
      return;
    }

    try {
      let res = await fetch('http://127.0.0.1:8000/api/signup', {
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
        toast.success("Account Successfully Created!");
        router.push("/login");
      } else {
        let errors = data.errors;
        if (errors) {
          let firstError = Object.values(errors)[0][0];
          toast.error(firstError);
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return <div className="w-screen h-screen flex justify-center items-center">
    <form id="signup-form" className=" pt-4 pb-10 w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] border-2 rounded-xl flex flex-col justify-center" onSubmit={createAccount}>
      <p className="text-center text-2xl mt-8">Welcome to Bhumi</p>
      <div className="flex justify-around rounded-md w-[70%] ml-[15%] mt-6 bg-secondary border-card">
        <div className="text-center pl-2 pr-2 pt-1 pb-1 rounded-md cursor-pointer w-[50%]" onClick={() => router.push('/login')}>Log in</div>
        <div className="text-center w-[50%] pl-2 pr-2 pt-1 pb-1 rounded-md cursor-pointer bg-card" onClick={() => router.push('/signup')}>Sign up</div>
      </div>
      <div className="pt-8 pl-8 pr-8">
        <div className="flex">
          <div className="flex flex-col mr-2">
            <label className=" text-xs">First Name</label>
            <input type="text" name="firstName" placeholder="Ram" className="border-2 px-3 mt-2 rounded-md outline-0 w-full"></input>
          </div>
          <div className="flex flex-col">
            <label className=" text-xs">Last Name</label>
            <input type="text" name="lastName" placeholder="Sharma" className="border-2 px-3 mt-2 rounded-md outline-0 w-full"></input>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className=" text-xs">Email address</label>
          <input type="email" name="email" className="border-2  px-3 mt-2 rounded-md outline-0" placeholder="you@example.com"></input>
        </div>
        <div className="flex flex-col mt-4">
          <label className=" text-xs">Phone</label>
          <input type="text" name="phone" className="border-2  px-3 mt-2 rounded-md outline-0" placeholder="98/97XXXXXXXX"></input>
        </div>
        <div className="flex flex-col mt-4">
          <label className=" text-xs">Password</label>
          <input type="password" name="password" placeholder="Min. 8 characters" className="border-2  px-3 mt-2 rounded-md outline-0"></input>
        </div>
        <div className="flex flex-col gap-y-2 mt-4">
          <label className=" text-xs">Account Type</label>
          <select name="accountType" className="border-2 rounded-md px-2">
            <option value={"buyer"}>Buyer</option>
            <option value={"seller"}>Seller</option>
          </select>
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="text-md p-4 cursor-pointer">Create Account</Button>
        </div>
      </div>
    </form>
  </div>
}