import React from 'react';
import { X } from 'lucide-react';

const AdminUserDetailModal = ({ user, onClose, requests }) => {
  if (!user) return null;

  // Helper function to check if a value exists and is not empty
  const hasValue = (value) => {
    if (value === null || value === undefined || value === '') return false;
    return true;
  };

  // Define user fields
  const userFields = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'createdAt', label: 'Joined Date' },
    { key: 'address', label: 'Address', fullWidth: true },
  ];

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Filter fields that have values
  const visibleFields = userFields.filter(field => hasValue(user[field.key]));

  // Get user's requests
  const userRequests = requests ? requests.filter(r => r.userId === user.id) : [];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">User Details</h3>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            {visibleFields.map((field) => (
              <div 
                key={field.key} 
                className={`detail-item ${field.fullWidth ? 'detail-full' : ''}`}
              >
                <p className="detail-label">{field.label}</p>
                <p className="detail-value">
                  {field.key === 'createdAt' ? formatDate(user[field.key]) : user[field.key]}
                </p>
              </div>
            ))}
          </div>
          
          
          {visibleFields.length === 0 && (
            <p className="detail-text" style={{ textAlign: 'center', color: '#718096' }}>
              No data available for this user.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailModal;