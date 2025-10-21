import React, { useState } from 'react';
import { Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const AdminRequestsTable = ({ requests, setRequests, setSelectedRequest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate pagination
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = requests.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return 'N/A';
    }
  };

  // Helper function to safely get status
  const getStatus = (req) => {
    if (req.status) return req.status;
    return 'Pending';
  };

  const deleteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return;
    }

    try {
      let response = await axios.delete(`https://datazapptoolbackend.vercel.app/deleteRequest/${id}`);
      setRequests((prev) => {
        let old;
        if (prev.length > 0) {
          old = [...prev];
        } else {
          old = prev;
        }
        let newrequests = old.filter(u => u._id != id);
        old = newrequests;
        return old;
      });
      
      // Adjust current page if needed after deletion
      const newTotal = requests.length - 1;
      const newTotalPages = Math.ceil(newTotal / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
      alert("Request deleted successfully");
    } catch (e) {
      alert("Failed to delete request");
    }
  };

  return (
    <div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Campaign Type</th>
              <th>Save Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((req) => (
                <tr key={req.id || req._id}>
                  <td className="font-medium">{req.user?.name || req.user || 'Unknown'}</td>
                  <td>{req.campaign_type || 'N/A'}</td>
                  <td>{req.save_name || 'Untitled'}</td>
                  <td>{formatDate(req.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="action-btn action-view"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => deleteRequest(req._id)} 
                        className="action-btn action-delete" 
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {requests.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Show</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              style={{
                padding: '0.375rem 0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
              entries
            </span>
          </div>

          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Showing {startIndex + 1} to {Math.min(endIndex, requests.length)} of {requests.length} entries
          </div>

          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                backgroundColor: currentPage === 1 ? '#f8fafc' : 'white',
                color: currentPage === 1 ? '#cbd5e1' : '#475569',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  style={{
                    padding: '0.5rem 0.75rem',
                    color: '#94a3b8'
                  }}
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.375rem',
                    backgroundColor: currentPage === page ? '#3b82f6' : 'white',
                    color: currentPage === page ? 'white' : '#475569',
                    cursor: 'pointer',
                    fontWeight: currentPage === page ? '600' : '400',
                    minWidth: '2.5rem'
                  }}
                >
                  {page}
                </button>
              )
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                backgroundColor: currentPage === totalPages ? '#f8fafc' : 'white',
                color: currentPage === totalPages ? '#cbd5e1' : '#475569',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRequestsTable;