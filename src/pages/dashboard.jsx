import React, { useEffect, useState } from 'react';
import { Users, FileText, Search, Filter, Eye, Trash2, Edit, Menu, X, LogOut, Settings, BarChart3 } from 'lucide-react';
import './AdminDashboard.css';
import Header from '../component/AdminHeader';
import RequestDetailModal from '../component/AdminRequestDetailModal';
import RequestsTable from '../component/AdminRequestsTable';
import Sidebar from '../component/AdminSidebar';
import StatsGrid from '../component/AdminStatsGrid';
import UserDetailModal from '../component/AdminUserDetailModal';
import UsersTable from '../component/AdminUsersTable';

import axios from 'axios';
import EditUserModal from '../component/AdminEditUser';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('users');
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
  
    const [users, setUsers] = useState([
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', address: '123 Main St', createdAt: '2024-10-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', address: '456 Oak Ave', createdAt: '2024-10-16' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', address: '789 Pine Rd', createdAt: '2024-10-17' },
      { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1234567893', address: '321 Elm St', createdAt: '2024-10-18' },
    ]);
  
    const [requests,setRequests] = useState([
        { 
          id: 1, 
          userId: 1, 
          userName: 'John Doe', 
          campaign_type: 'Email Campaign', 
          save_name: 'Q4 Marketing', 
          phone_options: 'Mobile Only',
          dedup_option: 'Remove Duplicates',
          supression_option: 'Global Suppression',
          zip_codes: ['90001', '10001'],
          states: ['CA', 'NY'], 
          cities: ['Los Angeles', 'New York'],
          dwelling_type: ['Single Family', 'Apartment'],
          home_owner: ['Homeowner'],
          hh_income: ['75k-100k', '100k-150k'],
          indivisuals: ['High Net Worth'],
          martial_status: ['Married', 'Single'],
          age_group: ['35-44', '45-54'],
          credit_rating: ['Excellent', 'Good'],
          occupation: 'Professional',
          ethnic_code: ['White', 'Hispanic'],
          propensity_to_give: ['High'],
          donor_affinity_range: ['500-1000'],
          donor_affinity_op: 'AND',
          turning_65: ['2024', '2025'],
          pet_range: ['1-2'],
          pet_op: 'AND',
          propensity_range: ['75-100'],
          propensity_op: 'AND',
          outdoor_range: ['Hiking', 'Camping'],
          outdoor_op: 'OR',
          sports_and_fitness_range: ['Running', 'Yoga'],
          sports_and_fitness_op: 'OR',
          travel_and_hobbies_range: ['International', 'Domestic'],
          travel_and_hobbies_op: 'OR',
          genre_range: ['Action', 'Drama'],
          genre_op: 'AND',
          createdAt: '2024-10-20', 
          updatedAt: '2024-10-20',
          status: 'Active' 
        },
        { 
          id: 2, 
          userId: 2, 
          userName: 'Jane Smith', 
          campaign_type: 'Phone Campaign', 
          save_name: 'Winter Sale', 
          phone_options: 'Landline Only',
          dedup_option: 'Keep Duplicates',
          supression_option: 'No Suppression',
          zip_codes: ['77001'],
          states: ['TX'], 
          cities: ['Houston'],
          dwelling_type: ['Condo'],
          home_owner: ['Renter'],
          hh_income: ['50k-75k'],
          indivisuals: ['Middle Income'],
          martial_status: ['Single'],
          age_group: ['25-34'],
          credit_rating: ['Good'],
          occupation: 'Service Industry',
          ethnic_code: ['African American'],
          propensity_to_give: ['Medium'],
          donor_affinity_range: ['100-500'],
          donor_affinity_op: 'OR',
          turning_65: ['2026'],
          pet_range: ['0'],
          pet_op: 'OR',
          propensity_range: ['50-75'],
          propensity_op: 'OR',
          outdoor_range: ['Fishing'],
          outdoor_op: 'AND',
          sports_and_fitness_range: ['Gym'],
          sports_and_fitness_op: 'AND',
          travel_and_hobbies_range: ['Road Trips'],
          travel_and_hobbies_op: 'AND',
          genre_range: ['Comedy'],
          genre_op: 'OR',
          createdAt: '2024-10-19', 
          updatedAt: '2024-10-19',
          status: 'Pending' 
        },
        { 
          id: 3, 
          userId: 1, 
          userName: 'John Doe', 
          campaign_type: 'Direct Mail', 
          save_name: 'Spring Promo', 
          phone_options: 'All Phones',
          dedup_option: 'Remove Duplicates',
          supression_option: 'Custom Suppression',
          zip_codes: ['33101', '30301'],
          states: ['FL', 'GA'], 
          cities: ['Miami', 'Atlanta'],
          dwelling_type: ['Single Family'],
          home_owner: ['Homeowner'],
          hh_income: ['150k+'],
          indivisuals: ['Ultra High Net Worth'],
          martial_status: ['Married'],
          age_group: ['55-64'],
          credit_rating: ['Excellent'],
          occupation: 'Executive',
          ethnic_code: ['White'],
          propensity_to_give: ['Very High'],
          donor_affinity_range: ['1000+'],
          donor_affinity_op: 'AND',
          turning_65: ['2023'],
          pet_range: ['2+'],
          pet_op: 'AND',
          propensity_range: ['90-100'],
          propensity_op: 'AND',
          outdoor_range: ['Golf', 'Tennis'],
          outdoor_op: 'OR',
          sports_and_fitness_range: ['Swimming'],
          sports_and_fitness_op: 'OR',
          travel_and_hobbies_range: ['Luxury'],
          travel_and_hobbies_op: 'OR',
          genre_range: ['Documentary'],
          genre_op: 'AND',
          createdAt: '2024-10-18', 
          updatedAt: '2024-10-18',
          status: 'Completed' 
        },
        { 
          id: 4, 
          userId: 3, 
          userName: 'Mike Johnson', 
          campaign_type: 'Email Campaign', 
          save_name: 'Newsletter Oct', 
          phone_options: 'Mobile Preferred',
          dedup_option: 'Remove Duplicates',
          supression_option: 'Regional Suppression',
          zip_codes: ['98101'],
          states: ['WA'], 
          cities: ['Seattle'],
          dwelling_type: ['Apartment', 'Townhouse'],
          home_owner: ['Homeowner', 'Renter'],
          hh_income: ['100k-150k'],
          indivisuals: ['High Net Worth'],
          martial_status: ['Married'],
          age_group: ['45-54'],
          credit_rating: ['Good', 'Excellent'],
          occupation: 'Tech Professional',
          ethnic_code: ['Asian'],
          propensity_to_give: ['High'],
          donor_affinity_range: ['500-1000'],
          donor_affinity_op: 'AND',
          turning_65: ['2024'],
          pet_range: ['1'],
          pet_op: 'AND',
          propensity_range: ['80-95'],
          propensity_op: 'AND',
          outdoor_range: ['Hiking', 'Cycling'],
          outdoor_op: 'OR',
          sports_and_fitness_range: ['Running', 'Weightlifting'],
          sports_and_fitness_op: 'OR',
          travel_and_hobbies_range: ['Adventure'],
          travel_and_hobbies_op: 'OR',
          genre_range: ['Sci-Fi', 'Fantasy'],
          genre_op: 'OR',
          createdAt: '2024-10-17', 
          updatedAt: '2024-10-17',
          status: 'Active' 
        },
      ]);

    // Handle save user updates
    const handleSaveUser = (updatedUser) => {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === updatedUser._id ? updatedUser : user
        )
      );
    };
  
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const filteredRequests = requests.filter(req =>
      req?.userName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      req?.campaign_type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      req?.save_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
 
useEffect(()=>{
getUsers()
getRequests();
},[])


const getRequests=async()=>{
    try{
let response=await axios.get(`https://datazapptoolbackend.vercel.app/getRequests`)
console.log(response.data)
setRequests(response.data.requests)
    }catch(e){

    }
}

const getUsers=async()=>{
    try{
let response=await axios.get(`https://datazapptoolbackend.vercel.app/getUsers`)

setUsers(response.data.users)
    }catch(e){

    }
}

    return (
      <>
        <div className="dashboard-container">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="main-content">
            <Header
              activeTab={activeTab}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <StatsGrid users={users} requests={requests} />

            <div className="content-area">
              {activeTab === 'users' ? (
                <UsersTable 
                  users={filteredUsers} 
                  setSelectedUser={setSelectedUser}
                  setEditUser={setEditUser}
                />
              ) : (
                <RequestsTable 
                setRequests={setRequests}
                  requests={filteredRequests} 
                  setSelectedRequest={setSelectedRequest} 
                />
              )}
            </div>
          </div>

          <UserDetailModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            requests={requests}
          />

          <EditUserModal
            user={editUser}
            onClose={() => setEditUser(null)}
            onSave={handleSaveUser}
          />

          <RequestDetailModal
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
          />
        </div>
      </>
    );
}