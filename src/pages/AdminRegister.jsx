import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      const response = await fetch('https://datazapptoolbackend.vercel.app/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Show error from backend in alert
 
        setError(data.error || 'Registration failed. Please try again.');
      } else {
        // Show success message in alert
        alert(data.message || 'Registration successful! Please login.');
        // Redirect to login page
        window.location.href = '/adminLogin';
      }
    } catch (err) {
      const errorMessage = 'Network error. Please check your connection and try again.';
   
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        width: '100%',
        maxWidth: '500px',
        padding: '2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '0.5rem'
          }}>
            Create Admin Account
          </h1>
          <p style={{ color: '#718096', fontSize: '0.875rem' }}>
            Fill in the details to create your admin account
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fed7d7',
            color: '#c53030',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#4a5568',
              marginBottom: '0.5rem'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a0aec0'
              }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="admin@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#4a5568',
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a0aec0'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#a0aec0'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#4a5568',
              marginBottom: '0.5rem'
            }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a0aec0'
              }} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#a0aec0'
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: loading ? '#a0aec0' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: '#718096', fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <a href="/adminLogin" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;