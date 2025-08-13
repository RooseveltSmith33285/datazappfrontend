import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowLeft, Database, Shield, Zap, Globe, CheckCircle, Lock } from 'lucide-react';
import styles from './LoginPage.module.css';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get reset token from URL parameters
    const resetToken = searchParams.get('id');
    if (!resetToken) {
      // Redirect to forgot password page if no token
      navigate('/forgot-password');
    } else {
      setToken(resetToken);
    }
  }, [searchParams, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`https://datazapptoolbackend.vercel.app/resetpassword`, {
        id: token,
        password: formData.password,
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (e) {
      setIsSubmitting(false);
      if (e?.response?.data?.error) {
        setErrors({ password: e.response.data.error });
      } else {
        setErrors({ password: "Unable to reset password. Please try again or request a new reset link." });
      }
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: '#ef4444' };
      case 2: return { text: 'Weak', color: '#f97316' };
      case 3: return { text: 'Fair', color: '#eab308' };
      case 4: return { text: 'Good', color: '#22c55e' };
      case 5: return { text: 'Strong', color: '#10b981' };
      default: return { text: 'Very Weak', color: '#ef4444' };
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthInfo = getStrengthText(passwordStrength);

  // Success state render
  if (isSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.pattern}></div>
        
        <div className={styles.card}>
          {/* Left Side - Branding */}
          <div className={styles.branding}>
            <div className={styles.circleTop}></div>
            <div className={styles.circleBottom}></div>
            
            <div className={styles.brandContent}>
              <img src="https://www.enrichifydata.com/wp-content/uploads/2024/11/WhatsApp_Image_2024-11-24_at_8.44.26_PM-removebg-preview.png" alt="Enrichify Logo" />
              
              <h2 className={styles.heading}>
                Password Reset
                <span>Successfully!</span>
              </h2>
              
              <p className={styles.description}>
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              
              <div className={styles.features}>
                <div className={styles.feature}>
                  <Shield className={styles.featureIcon} />
                  <span>Secure authentication</span>
                </div>
                <div className={styles.feature}>
                  <Zap className={styles.featureIcon} />
                  <span>Instant access</span>
                </div>
                <div className={styles.feature}>
                  <Globe className={styles.featureIcon} />
                  <span>Global availability</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Success Message */}
          <div className={styles.formSection}>
            <div className={styles.formContainer}>
              <div className={styles.successContainer}>
                <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 20px' }} />
                
                <div className={styles.formHeader}>
                  <h2>Password Reset Complete!</h2>
                  <p style={{color:'white'}}>Your password has been successfully updated.</p>
                </div>

                <div className={styles.successInstructions}>
                  <h3 style={{color:'white'}}>What's Next:</h3>
                  <ol>
                    <li style={{color:'white'}}>You'll be redirected to login automatically</li>
                    <li style={{color:'white'}}>Use your email and new password to sign in</li>
                    <li style={{color:'white'}}>Start using ENRICHIFY with enhanced security</li>
                  </ol>
                  
                  <p style={{color:'white'}} className={styles.helpText}>
                    Keep your new password safe and don't share it with anyone.
                  </p>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className={styles.submitButton}
                    style={{ width: '100%' }}
                  >
                    Continue to Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default form render
  return (
    <div className={styles.container}>
      <div className={styles.pattern}></div>
      
      <div className={styles.card}>
        {/* Left Side - Branding */}
        <div className={styles.branding}>
          <div className={styles.circleTop}></div>
          <div className={styles.circleBottom}></div>
          
          <div className={styles.brandContent}>
            <img src="https://www.enrichifydata.com/wp-content/uploads/2024/11/WhatsApp_Image_2024-11-24_at_8.44.26_PM-removebg-preview.png" alt="Enrichify Logo" />
            
            <h2 className={styles.heading}>
              Create New Password
              <span>Secure & Strong</span>
            </h2>
            
            <p className={styles.description}>
              Your new password should be unique and something you haven't used before.
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <Shield className={styles.featureIcon} />
                <span>Enhanced security</span>
              </div>
              <div className={styles.feature}>
                <Zap className={styles.featureIcon} />
                <span>Quick setup</span>
              </div>
              <div className={styles.feature}>
                <Globe className={styles.featureIcon} />
                <span>Global protection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Form */}
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.mobileLogo}>
              <Database className={styles.mobileIcon} />
              <h1>ENRICHIFY</h1>
            </div>
            
            <div className={styles.formHeader}>
              <h2>Set New Password</h2>
              <p>Create a strong password for your account</p>
            </div>

            <div className={styles.fields}>
              {/* New Password */}
              <div className={styles.formGroup}>
                <label>New Password</label>
                <div style={{gap:'1rem'}} className={styles.passwordInput}>
                  <Lock style={{color:'white'}} className={styles.inputIcon} size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your new password"
                    disabled={isSubmitting}
                    style={{ paddingLeft: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.toggle}
                  >
                    {showPassword ? <EyeOff style={{color:'white'}} size={20} /> : <Eye style={{color:'white'}} size={20} />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className={styles.passwordStrength}>
                    <div className={styles.strengthBar}>
                      <div 
                        className={styles.strengthFill}
                        style={{ 
                          width: `${(passwordStrength / 5) * 100}%`,
                          backgroundColor: strengthInfo.color
                        }}
                      ></div>
                    </div>
                    <span style={{ color: strengthInfo.color, fontSize: '12px' }}>
                      {strengthInfo.text}
                    </span>
                  </div>
                )}
                
                {errors.password && <p className={styles.error}>{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className={styles.formGroup}>
                <label>Confirm New Password</label>
                <div style={{gap:'1rem'}} className={styles.passwordInput}>
                  <Lock style={{color:'white'}} className={styles.inputIcon} size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                    disabled={isSubmitting}
                    style={{ paddingLeft: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={styles.toggle}
                  >
                    {showConfirmPassword ? <EyeOff style={{color:'white'}} size={20} /> : <Eye style={{color:'white'}} size={20} />}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className={styles.matchIndicator}>
                    {formData.password === formData.confirmPassword ? (
                      <span style={{ color: '#10b981', fontSize: '12px' }}>
                        ✓ Passwords match
                      </span>
                    ) : (
                      <span style={{ color: '#ef4444', fontSize: '12px' }}>
                        ✗ Passwords don't match
                      </span>
                    )}
                  </div>
                )}
                
                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
              </div>

              {/* Password Requirements */}
              <div className={styles.passwordRequirements}>
                <h4 style={{color:'white'}}>Password Requirements:</h4>
                <ul>
                  <li style={{ color: formData.password.length >= 8 ? '#10b981' : '#64748b' }}>
                    At least 8 characters
                  </li>
                  <li style={{ color: /[a-z]/.test(formData.password) ? '#10b981' : '#64748b' }}>
                    One lowercase letter
                  </li>
                  <li style={{ color: /[A-Z]/.test(formData.password) ? '#10b981' : '#64748b' }}>
                    One uppercase letter
                  </li>
                  <li style={{ color: /\d/.test(formData.password) ? '#10b981' : '#64748b' }}>
                    One number
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={styles.submitButton}
                style={{ marginTop: '1.5rem' }}
              >
                {isSubmitting ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className={styles.spinner}></div>
                    Updating Password...
                  </div>
                ) : (
                  <>
                    <Lock size={20} />
                    Update Password
                  </>
                )}
              </button>

              {/* Back to Login */}
              <div className={styles.backToLogin}>
                <button
                  type="button"
                  style={{ color: 'white', cursor: "pointer" }}
                  onClick={handleBackToLogin}
                  className={styles.linkButton}
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;