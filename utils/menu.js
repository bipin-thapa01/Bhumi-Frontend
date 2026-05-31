"use client";

import { useState, useRef } from "react";

const menuItems = [
  { label: "Profile", icon: "👤", href: "#" },
  { label: "Settings", icon: "⚙️", href: "#" },
  { label: "Notifications", icon: "🔔", href: "#" },
  { label: "Help & Support", icon: "💬", href: "#" },
  { label: "Sign Out", icon: "🚪", href: "#", danger: true },
];

export default function HoverMenu({}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer select-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
          JD
        </div>
        <span className="text-sm font-medium text-gray-800">John Doe</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        className={`
          absolute top-[calc(100%+8px)] right-0
          w-56 bg-white border border-gray-100 rounded-2xl shadow-xl
          overflow-hidden origin-top-right
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${open
            ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-x-4 pointer-events-none"
          }
        `}
        role="menu"
      >
        <div className="h-1 bg-gradient-to-r from-indigo-400 to-purple-500" />

        <div className="p-1.5">
          {menuItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              role="menuitem"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                item.danger
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
              style={{
                transform: open ? "translateX(0)" : "translateX(8px)",
                opacity: open ? 1 : 0,
                transition: `transform 300ms cubic-bezier(0.16,1,0.3,1) ${i * 30}ms, opacity 200ms ease ${i * 30}ms, background-color 150ms ease`,
              }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>

        <div className="border-t border-gray-100 px-4 py-2.5">
          <p className="text-[11px] text-gray-400 text-center">john@example.com</p>
        </div>
      </div>
    </div>
  );
}