"use client"

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";


export default   function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null); // Explicitly typing the ref
  const { data: session } = useSession();


  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

 
  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 transform bg-gray-800 w-64 md:relative md:translate-x-0 transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">Sidebar</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800">

        <Link  className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700" href={"/dashboard/settings"}>Profile</Link>
        <a   href="#" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700" onClick={() => signOut()}>Sign Out</a>
        <Link  className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"  href={"/dashboard/job"} >Manage Job</Link>
                    
                    </nav>
   
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 p-5">
          <div className="flex items-center">
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              {/* ... */}
            </button>
            <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
          </div>
          <div className="flex items-center">
  <div className="flex items-center">
    <div className="h-10 w-10 rounded-full border-2 border-black flex items-center justify-center mr-2">
      A
    </div>
    <span className="text-gray-700 font-medium">
    <span className="text-sm text-gray-500">Hello,</span>  <br />
      {session?.user.name?.substring(0, session?.user.name?.indexOf(' '))
      }
    </span>
  </div>

  <div className="ml-5">
    <Button> Sign Out</Button>
  </div>
  <div>
    {/* Additional content here */}
  </div>
</div>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
