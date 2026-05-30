import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function Nav({ isLogin, user }) {
  const [profile, setProfile] = useState();
  const [alias, setAlias] = useState("");

  useEffect(() => {
    if (isLogin) {
      setProfile(user);
      const nameArray = user.name.split(" ");
      setAlias(nameArray[0][0] + nameArray[1][0]);
    }
  }, []);

  return <>
    <nav className="w-full py-4 flex justify-between items-center">
      <div className="font-bold text-2xl cursor-pointer">Bhumi</div>
      <div className="flex gap-x-4">
        {
          isLogin ?
            <>
              <div className="flex items-center justify-center cursor-pointer w-10 h-10">
                <IoMdSearch size={22} />
              </div>
              <div className="bg-white hover:bg-gray-light text-black w-10 h-10 p-2 rounded-[50%] text-center cursor-pointer font-bold">
                {alias}
              </div>
            </> :
            <div className="flex gap-x-6">
              <button className="cursor-pointer hover:bg-accent px-4 py-1 rounded-md">Login</button>
              <button className="bg-accent-foreground text-background px-4 rounded-md cursor-pointer hover:bg-gray-400">Signup</button>
            </div>
        }
      </div>
    </nav>
  </>
}