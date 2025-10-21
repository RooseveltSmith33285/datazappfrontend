import React from 'react';
import { X } from 'lucide-react';

const AdminRequestDetailModal = ({ request, onClose }) => {
  if (!request) return null;

  // Helper function to check if a value exists and is not empty
  const hasValue = (value) => {
    if (value === null || value === undefined || value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  };

  // Helper function to format array values
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  // Define all possible fields with their labels
  const fields = [
    { key: 'userName', label: 'User Name' },
    { key: 'save_name', label: 'Save Name' },
    { key: 'campaign_type', label: 'Campaign Type' },
    { key: 'phone_options', label: 'Phone Options' },
    { key: 'dedup_option', label: 'Dedup Option' },
    { key: 'supression_option', label: 'Suppression Option' },
    { key: 'zip_codes', label: 'Zip Codes' },
    { key: 'states', label: 'States' },
    { key: 'cities', label: 'Cities' },
    { key: 'dwelling_type', label: 'Dwelling Type' },
    { key: 'home_owner', label: 'Home Owner' },
    { key: 'hh_income', label: 'Household Income' },
    { key: 'indivisuals', label: 'Individuals' },
    { key: 'martial_status', label: 'Marital Status' },
    { key: 'age_group', label: 'Age Group' },
    { key: 'credit_rating', label: 'Credit Rating' },
    { key: 'occupation', label: 'Occupation' },
    { key: 'ethnic_code', label: 'Ethnic Code' },
    { key: 'propensity_to_give', label: 'Propensity to Give' },
    { key: 'donor_affinity_range', label: 'Donor Affinity Range' },
    { key: 'donor_affinity_op', label: 'Donor Affinity Operator' },
    { key: 'turning_65', label: 'Turning 65' },
    { key: 'pet_range', label: 'Pet Range' },
    { key: 'pet_op', label: 'Pet Operator' },
    { key: 'propensity_range', label: 'Propensity Range' },
    { key: 'propensity_op', label: 'Propensity Operator' },
    { key: 'outdoor_range', label: 'Outdoor Range' },
    { key: 'outdoor_op', label: 'Outdoor Operator' },
    { key: 'sports_and_fitness_range', label: 'Sports & Fitness Range' },
    { key: 'sports_and_fitness_op', label: 'Sports & Fitness Operator' },
    { key: 'travel_and_hobbies_range', label: 'Travel & Hobbies Range' },
    { key: 'travel_and_hobbies_op', label: 'Travel & Hobbies Operator' },
    { key: 'genre_range', label: 'Genre Range' },
    { key: 'genre_op', label: 'Genre Operator' },
    { key: 'status', label: 'Status', isStatus: true },
    { key: 'createdAt', label: 'Created At', fullWidth: true, isDate: true },
    { key: 'updatedAt', label: 'Updated At', fullWidth: true, isDate: true },
  ];

  // Get value with fallback to alternative key
  const getValue = (field) => {
    // Special handling for userName field
    if (field.key === 'userName') {
      if (request.userName) return request.userName;
      if (request.user?.name) return request.user.name;
      return null;
    }
    
    if (request[field.key] !== undefined && request[field.key] !== null) {
      return request[field.key];
    }
    if (field.altKey && request[field.altKey] !== undefined && request[field.altKey] !== null) {
      return request[field.altKey];
    }
    return null;
  };

  // Filter fields that have values
  const visibleFields = fields.filter(field => hasValue(getValue(field)));

  return (
    <div className="modal-overlay">
      <div className="modal modal-large">
        <div className="modal-header">
          <h3 className="modal-title">Request Details</h3>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            {visibleFields.map((field) => {
              const value = getValue(field);
              return (
                <div 
                  key={field.key} 
                  className={`detail-item ${field.fullWidth ? 'detail-full' : ''}`}
                >
                  <p className="detail-label">{field.label}</p>
                  {field.isStatus ? (
                    <span className={`status-badge status-${value?.toLowerCase() || 'pending'}`}>
                      {value || 'Pending'}
                    </span>
                  ) : field.isDate ? (
                    <p className="detail-value">{formatDate(value)}</p>
                  ) : (
                    <p className="detail-value">{formatValue(value)}</p>
                  )}
                </div>
              );
            })}
          </div>
          
          {visibleFields.length === 0 && (
            <p className="detail-text" style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>
              No data available for this request.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRequestDetailModal;