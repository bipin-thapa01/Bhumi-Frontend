"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  useEffect(
    () => {
    }
    , []);

  return <div className="w-screen h-screen flex justify-center items-center">
    <form className="pt-4 pb-10 w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]  border-2 rounded-xl flex flex-col  justify-center">
      <p className="text-center text-2xl mt-8">Welcome to Bhumi</p>
      <div className="flex justify-around rounded-md  w-[70%] ml-[15%] mt-6 bg-secondary">
        <div className="text-center pl-2 pr-2 pt-1 pb-1  w-[50%] rounded-md cursor-pointer bg-card" onClick={() => router.push('/login')}>Log in</div>
        <div className="text-center w-[50%] pl-2 pr-2 pt-1 pb-1 rounded-md cursor-pointer" onClick={() => router.push('/signup')}>Sign up</div>
      </div>
      <div className="pt-8 pl-8 pr-8">
        <div className="flex flex-col">
          <Field>
            <FieldLabel htmlFor="input-field-email">Email</FieldLabel>
            <Input
              id="input-field-email"
              type="email"
              placeholder="Enter your email"
            />
          </Field>
        </div>
        <div className="flex flex-col mt-4">
        <Field>
            <FieldLabel htmlFor="input-field-password">Password</FieldLabel>
            <Input
              id="input-field-password"
              type="password"
              placeholder="Enter your password"
            />
          </Field>
        </div>
        <div className=" text-xs mt-4 hover:cursor-pointer text-primary">Forgot Password?</div>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="text-md p-4 cursor-pointer">Login</Button>
        </div>
      </div>
    </form>
  </div>
}