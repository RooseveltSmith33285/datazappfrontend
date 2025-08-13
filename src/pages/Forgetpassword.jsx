import React, { useState } from 'react';
import { Eye, EyeOff, Database, Shield, Zap, Globe, RefreshCw } from 'lucide-react';
import styles from './LoginPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear previous status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      let response = await axios.post(`https://datazapptoolbackend.vercel.app/forgetpassword`, formData);
      setSubmitStatus('success');
      alert("Reset password link sent");
    } catch (e) {
      setSubmitStatus('error');
      const errorMsg = e?.response?.data?.error || "Client error please try again";
      setErrorMessage(errorMsg);
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = async () => {
    // Reset UI state first
    setSubmitStatus('idle');
    setErrorMessage('');
    setErrors({});
    
    // Then immediately attempt to resend
    await handleSubmit();
  };

  const getButtonContent = () => {
    if (isSubmitting) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className={styles.spinner}></div>
          Sending link...
        </div>
      );
    }
    
    if (submitStatus === 'success') {
      return 'Link Sent Successfully ✓';
    }
    
    if (submitStatus === 'error') {
      return 'Send Failed - Try Again';
    }
    
    return 'Send reset link';
  };

  const getButtonStyle = () => {
    const baseStyle = { marginTop: '1rem' };
    
    if (submitStatus === 'success') {
      return { ...baseStyle, backgroundColor: '#10b981', borderColor: '#10b981' };
    }
    
    if (submitStatus === 'error') {
      return { ...baseStyle, backgroundColor: '#ef4444', borderColor: '#ef4444' };
    }
    
    return baseStyle;
  };

  return (
    <div className={styles.container}>
      <div className={styles.pattern}></div>
      
      <div className={styles.card}>
        {/* Left Side - Branding */}
        <div className={styles.branding}>
          <div className={styles.circleTop}></div>
          <div className={styles.circleBottom}></div>
          
          <div className={styles.brandContent}>
            <img src="https://www.enrichifydata.com/wp-content/uploads/2024/11/WhatsApp_Image_2024-11-24_at_8.44.26_PM-removebg-preview.png"/>
            
            <h2 className={styles.heading}>
              Welcome Back to
              <span>Advanced Analytics</span>
            </h2>
            
            <p className={styles.description}>
              Continue your data journey with enterprise-grade solutions and real-time insights.
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <Shield className={styles.featureIcon} />
                <span>Enterprise-grade security</span>
              </div>
              <div className={styles.feature}>
                <Zap className={styles.featureIcon} />
                <span>Real-time data processing</span>
              </div>
              <div className={styles.feature}>
                <Globe className={styles.featureIcon} />
                <span>Global data coverage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.mobileLogo}>
              <Database className={styles.mobileIcon} />
              <h1>DataFlow Pro</h1>
            </div>
            
            <div className={styles.formHeader}>
              <h2>Forget password</h2>
              <p>Get reset password link to reset password</p>
            </div>

            <div className={styles.fields}>
              {/* Email */}
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>

              {/* Password field (keeping it as in original - seems unused) */}
              <div className={styles.formGroup}>
                <div className={styles.passwordInput}>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.toggle}
                  >
                  </button>
                </div>
                {errors.password && <p className={styles.error}>{errors.password}</p>}
              </div>

              {/* Error Message Display */}
              {submitStatus === 'error' && errorMessage && (
                <div style={{ 
                  padding: '12px', 
                  backgroundColor: '#fef2f2', 
                  border: '1px solid #fecaca', 
                  borderRadius: '6px', 
                  color: '#dc2626',
                  fontSize: '14px',
                  marginTop: '1rem'
                }}>
                  <strong>Error:</strong> {errorMessage}
                </div>
              )}

              {/* Success Message Display */}
              {submitStatus === 'success' && (
                <div style={{ 
                  padding: '12px', 
                  backgroundColor: '#f0fdf4', 
                  border: '1px solid #bbf7d0', 
                  borderRadius: '6px', 
                  color: '#166534',
                  fontSize: '14px',
                  marginTop: '1rem'
                }}>
                  <strong>Success:</strong> Reset password link has been sent to your email!
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                style={getButtonStyle()}
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {getButtonContent()}
              </button>

              {/* Retry Button */}
              {submitStatus === 'error' && (
                <button
                  type="button"
                  onClick={handleRetry}
                  style={{
                    marginTop: '0.5rem',
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    border: '2px solid #6b7280',
                    borderRadius: '6px',
                    color: '#6b7280',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#6b7280';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#6b7280';
                  }}
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>
              )}

              {/* Send Another Link Button (for success state) */}
              {submitStatus === 'success' && (
                <button
                  type="button"
                  onClick={handleRetry}
                  style={{
                    marginTop: '0.5rem',
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    border: '2px solid #10b981',
                    borderRadius: '6px',
                    color: '#10b981',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#10b981';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#10b981';
                  }}
                >
                  <RefreshCw size={16} />
                  Send Another Link
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;