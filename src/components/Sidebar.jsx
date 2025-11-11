import React, { forwardRef } from 'react';
import { Cn } from "../utils/cn.js";
import SugboWorks from "../assets/Logo.png";
import PropTypes from 'prop-types';
import "../styles/Tailwind.css"
import { navbarLink } from '../constants/index.jsx'
import { NavLink } from 'react-router-dom';


export const Sidebar = forwardRef(({ collapsed }, ref) => {
    return (  
      <aside ref={ref} className={Cn("fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,0,0.2,1),left_300ms_cubic-bezier(0.4,0,0.2,1),background-color_150ms_cubic-bezier(0.4,0,0.2,1),border_150ms_cubic-bezier(0.4,0,0.2,1)] dark:border-slate-700 dark:bg-slate-900")} >

          <div className="flex items-center gap-x-1 p-2">
              <img src={SugboWorks} alt="Logo" style={{ height: '65px', width: 'auto', paddingTop: '2px', paddingLeft: '1px' }} className='p-2 dark:hidden'/>
              <img src={SugboWorks} alt="Logo" style={{ height: '65px', width: 'auto', paddingTop: '2px', paddingLeft: '1px'}} className='p-2 hidden dark:block'/>
              {!collapsed && <p className="self-center text-lg font-semibold text-slate-900 transition-colors dark:text-slate-50">SugboWorks</p>}
          </div>
          <div className='flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]'>
                  {navbarLink.map((link) => (
                    <NavLink
                    key={link.title}
                    to={link.path}
                    className="flex items-center gap-2 p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                       <link.icon size={22} className="flex-shrink-0"/>
                       {!collapsed && <span>{link.title}</span>}
                    </NavLink>
                  ))}
          </div>
      </aside>
    );
      

      });
Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};