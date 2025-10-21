
import React, { useState } from 'react';
import { Users, FileText, Search, Filter, Eye, Trash2, Edit, Menu, X, LogOut, Settings, BarChart3 } from 'lucide-react';


const StatsGrid = ({ users, requests }) => {
    const stats = [
      { label: 'Total Users', value: users.length, icon: Users, color: 'stat-blue' },
      { label: 'Total Requests', value: requests.length, icon: FileText, color: 'stat-green' },
      { label: 'Active Campaigns', value: requests.filter(r => r.status === 'Active').length, icon: BarChart3, color: 'stat-purple' },
      { label: 'Pending', value: requests.filter(r => r.status === 'Pending').length, icon: Filter, color: 'stat-orange' },
    ];
  
    return (
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className={`stat-icon ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

  export default StatsGrid