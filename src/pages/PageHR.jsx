import {React, useState, useRef} from "react";
import { Sidebar } from '../components/Sidebar';
import { Outlet } from "../components/Outlet";
import { Cn } from "../utils/cn.js";
import { Header } from '../components/Header';
import { useMediaQuery } from '@uidotdev/usehooks';
import "../styles/Tailwind.css"

const PageHR = () => {

    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(false);

    const sidebarRef = useRef(null);

  return (
    <div className="min-h-screen flex bg-slate-100 transition-colors dark:bg-slate-900">
      
      {/* Sidebar */}
      <Sidebar ref={sidebarRef} collapsed={collapsed}/>

 
      <div className={Cn("ftransition-[margin] duration-300")}>
        <Header />
        <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};

export default PageHR;
