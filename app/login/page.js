"use client";

import { useEffect } from "react";

export default function Login() {

  useEffect(
    () => {
    }
    , []);

  return <div className="w-screen h-screen flex justify-center items-center bg-bg1">
    <form className="pl-2 pr-2 pt-4 pb-10 w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] border-b1 border-2 rounded-xl flex flex-col bg-bg2 justify-center">
      <p className="text-center text-2xl mt-8">Welcome to Bhumi</p>
      <div className="flex justify-around rounded-md bg-bg3 w-[70%] ml-[15%] mt-6">
        <div className="text-center pl-2 pr-2 pt-1 pb-1 bg-bg4 w-[50%] rounded-md">Log in</div>
        <div className="text-center w-[50%] pl-2 pr-2 pt-1 pb-1 rounded-md">Sign up</div>
      </div>
      <div className="pt-8 pl-8 pr-8">
        <div className="flex flex-col">
          <label for="email" className="text-text3 text-xs">Email address</label>
          <input type="email" name="email" className="border-2 border-b1 px-3 py-2 mt-2 rounded-md outline-0" placeholder="you@example.com"></input>
        </div>
        <div className="flex flex-col mt-4">
          <label for="password" className="text-text3 text-xs">Password</label>
          <input type="password" name="password" className="border-2 border-b1 px-3 py-2 mt-2 rounded-md outline-0"></input>
        </div>
        <div className="text-primary-text text-xs mt-4 hover:cursor-pointer">Forgot Password?</div>
        <button className="mt-4 w-full bg-primary py-2 rounded-xl hover:cursor-pointer">Log In</button>
      </div>
    </form>
  </div>
}