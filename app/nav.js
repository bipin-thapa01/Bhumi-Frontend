import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiBellOn, CiSettings, CiUser } from "react-icons/ci";
import { FaSignOutAlt } from "react-icons/fa";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineSpaceDashboard, MdOutlineAnalytics, MdOutlinePayment, MdOutlineRateReview } from "react-icons/md";
import { BsHouseCheck, BsFileEarmarkText, BsClockHistory } from "react-icons/bs";
import { TbMessages, TbCalendarTime } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";

const profileMenuItems = [
  { label: "Profile", icon: <CiUser />, href: "/profile" },
  { label: "Settings", icon: <CiSettings />, href: "/settings" },
  { label: "Notifications", icon: <CiBellOn />, href: "/notifications" },
  { label: "Sign Out", icon: <FaSignOutAlt />, href: "#", danger: true },
];

const dashboardMenuItems = [
  { label: "Overview", icon: <MdOutlineSpaceDashboard />, href: "/dashboard" },
  { label: "My Listings", icon: <BsHouseCheck />, href: "/dashboard/listings" },
  { label: "Analytics", icon: <MdOutlineAnalytics />, href: "/dashboard/analytics" },
  { label: "Messages", icon: <TbMessages />, href: "/dashboard/messages" },
  { label: "Saved / Favourites", icon: <AiOutlineHeart />, href: "/dashboard/saved" },
  { label: "Payments", icon: <MdOutlinePayment />, href: "/dashboard/payments" },
  { label: "Reviews", icon: <MdOutlineRateReview />, href: "/dashboard/reviews" },
];

export default function Nav({ isLogin, user, isDashboard }) {
  const [profile, setProfile] = useState();
  const [alias, setAlias] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const profileRef = useRef(null);
  const dashboardRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      setProfile(user);
      const nameArray = user.name.split(" ");
      setAlias(nameArray[0][0] + nameArray[1][0]);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (dashboardOpen && dashboardRef.current && !dashboardRef.current.contains(e.target)) {
        setDashboardOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [profileOpen, dashboardOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="w-full py-4 flex justify-between items-center">
      <div className="flex items-center gap-x-8 justify-center">
        <div className="font-bold text-2xl cursor-pointer">Bhumi</div>
      </div>

      <div className="flex gap-x-5 items-center">
        {isLogin ? (
          <>
            <div className="flex items-center justify-center cursor-pointer w-10 h-10">
              <IoMdSearch size={22} />
            </div>

            {isDashboard && (
              <div ref={dashboardRef} className="relative">
                <button
                  onClick={() => setDashboardOpen((prev) => !prev)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors cursor-pointer"
                >
                  {dashboardOpen ? <FiX size={20} /> : <FiAlignJustify size={20} />}
                </button>

                <div
                  className={`
                    absolute top-[calc(100%+8px)] right-[-54]
                    w-64 bg-surface border border-border rounded-2xl shadow-xl
                    overflow-hidden origin-top-right z-50
                    transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${dashboardOpen
                      ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 scale-95 translate-x-4 pointer-events-none"
                    }
                  `}
                  role="menu"
                >
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Dashboard</p>
                  </div>

                  <div className="p-1.5 max-h-[70vh] overflow-y-hidden overflow-x-hidden">
                    {dashboardMenuItems.map((item, i) => (
                      <a
                        key={item.label}
                        href={item.href}
                        role="menuitem"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white transition-colors duration-150"
                        style={{
                          transform: dashboardOpen ? "translateX(0)" : "translateX(8px)",
                          opacity: dashboardOpen ? 1 : 0,
                          transition: `transform 300ms cubic-bezier(0.16,1,0.3,1) ${i * 25}ms, opacity 200ms ease ${i * 25}ms, background-color 150ms ease`,
                        }}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={profileRef} className="relative">
              <div
                onClick={() => setProfileOpen((prev) => !prev)}
                className="bg-white text-black w-10 h-10 p-2 rounded-[50%] text-center cursor-pointer font-bold flex items-center justify-center"
              >
                {alias}
              </div>

              <div
                className={`
                  absolute top-[calc(100%+8px)] right-0
                  w-56 bg-surface border border-border rounded-2xl shadow-xl
                  overflow-hidden origin-top-right z-50
                  transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${profileOpen
                    ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 scale-95 translate-x-4 pointer-events-none"
                  }
                `}
                role="menu"
              >
                <div className="px-4 py-2 border-b border-border text-gray-400 font-bold">
                  Bhumi
                </div>

                <div className="p-1.5">
                  {profileMenuItems.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      role="menuitem"
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-150 ${
                        item.danger ? "text-red-500" : "text-white"
                      }`}
                      style={{
                        transform: profileOpen ? "translateX(0)" : "translateX(8px)",
                        opacity: profileOpen ? 1 : 0,
                        transition: `transform 300ms cubic-bezier(0.16,1,0.3,1) ${i * 30}ms, opacity 200ms ease ${i * 30}ms, background-color 150ms ease`,
                      }}
                      onClick={item.label === "Sign Out" ? logout : () => router.push(item.href)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-x-6">
            <button className="cursor-pointer px-4 py-1 rounded-md" onClick={() => router.push("/login")}>Login</button>
            <button className="bg-accent-foreground text-background px-4 rounded-md cursor-pointer" onClick={() => router.push("/signup")}>Signup</button>
          </div>
        )}
      </div>
    </nav>
  );
}