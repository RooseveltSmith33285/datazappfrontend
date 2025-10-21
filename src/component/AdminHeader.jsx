import React, { useState } from 'react';
import { Users, FileText, Search, Filter, Eye, Trash2, Edit, Menu, X, LogOut, Settings, BarChart3 } from 'lucide-react';


const Header = ({ activeTab, searchTerm, setSearchTerm }) => {
    return (
      <header className="header">
        <h2 className="header-title">
          {activeTab === 'users' ? 'User Management' : 'Request Management'}
        </h2>
        <div className="header-actions">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </header>
    );
  };
  

  export default Header;