
import React, { useState } from 'react';
import { Users, FileText, Search, Filter, Eye, Trash2, Edit, Menu, X, LogOut, Settings, BarChart3 } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
    return (
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          {sidebarOpen && <h1 className="sidebar-title">Admin Panel</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebar-toggle">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <button
            onClick={() => setActiveTab('users')}
            className={`nav-item ${activeTab === 'users' ? 'nav-item-active' : ''}`}
          >
            <Users size={20} />
            {sidebarOpen && <span>Users</span>}
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`nav-item ${activeTab === 'requests' ? 'nav-item-active' : ''}`}
          >
            <FileText size={20} />
            {sidebarOpen && <span>Requests</span>}
          </button>
        
        </nav>
  
        <div className="sidebar-footer">
          <button className="nav-item">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    );
  };

  

  export default Sidebar