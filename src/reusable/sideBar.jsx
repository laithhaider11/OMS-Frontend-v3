import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./navBar.jsx";
import DynamicSidebar from "./../reusable elements/SideBarRuseable";
import useAuthStore from "./../store/store";
import "./../pages/dashboard.css";

export default function Sidebar() {
  const { logout, isSidebarCollapsed, toggleSidebar } = useAuthStore();
  const location = useLocation();
  // Add this useEffect for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        useAuthStore.setState({ isSidebarCollapsed: true });
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div>
      {/* Navigation Bar */}
      <NavBar onSidebarToggle={toggleSidebar} />

      {/* Dynamic Sidebar */}
      <DynamicSidebar
        currentPath={location.pathname} // Pass the current path to determine active menu item
        onLogout={() => {
          logout();
          window.location.href = "/"; // Redirect to login
        }}
        sidebarClassName={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}
        menuItemClassName="menu-item"
        activeMenuItemClassName="menu-item-active" // Add class for active item
        logoutClassName="logout"
      />

      {/* Placeholder for additional content */}
      <div
        className={`dashboard-content ${isSidebarCollapsed ? "expanded" : ""}`}>
        {/* Rendered content goes here */}
      </div>
    </div>
  );
}
/* مكاعد نستخدمه حاليا */
