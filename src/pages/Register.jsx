import React, { useState } from 'react';
import { Eye, EyeOff, Database, Shield, Zap, Globe, X, Lock } from 'lucide-react';
import styles from './RegistrationPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    sale_rep: '', // New field for sales representative
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const navigate = useNavigate();

  // Sales representatives array
  const salesRepresentatives = [
    'Joe Acquafredda',
    'Andrew Johnson',
    'Roosevelt Smith',
    'Kyle Black',
    'Kyle Peachey'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.sale_rep) newErrors.sale_rep = 'Please select a sales representative'; // New validation
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    
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
      let response = await axios.post(`https://datazapptoolbackend.vercel.app/register`, formData);
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Registration successful! Welcome to Enrichify.');
      }, 2000);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("firstTime", true);
      navigate('/consumer');
    } catch(e) {
      setIsSubmitting(false);
      if(e?.response?.data?.error) {
        alert(e?.response?.data?.error);
      } else {
        alert("Client error please try again");
      }
    }
  };

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal);
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthInfo = getStrengthText(passwordStrength);

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
              Unlock the Power of
              <span>Advanced Analytics</span>
            </h2>
            
            <p className={styles.description}>
              Join thousands of professionals who trust ENRICHIFY for enterprise-grade data solutions and real-time insights.
            </p>

            {/* Database Statistics */}
            <div style={{color:'white'}} className={styles.databaseStats}>
              <div className={styles.statsHeader}>
                <Database className={styles.databaseIcon} />
                <h3>National Consumer Database</h3>
              </div>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>218M</span>
                  <span className={styles.statLabel}>Records</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>82M</span>
                  <span className={styles.statLabel}>Emails</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>76M</span>
                  <span className={styles.statLabel}>Cell Phones</span>
                </div>
              </div>
            </div>
            
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

        {/* Right Side - Registration Form */}
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.mobileLogo}>
              <img style={{width:'70%'}} src="https://www.enrichifydata.com/wp-content/uploads/2024/11/WhatsApp_Image_2024-11-24_at_8.44.26_PM-removebg-preview.png" alt="Enrichify Logo" />
            </div>
            
            <div className={styles.formHeader}>
              <h2>Create Account</h2>
              <p>Start your data journey today</p>
              
              {/* Mobile Database Stats */}
              <div className={styles.mobileDatabaseStats}>
                <p><strong>Access our National Consumer Database:</strong></p>
                <p>218M records • 82M emails • 76M cell phones</p>
              </div>
            </div>

            <div className={styles.formFields}>
              {/* Full Name */}
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>

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

              {/* Phone Number */}
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
              </div>

              {/* Address */}
              <div className={styles.formGroup}>
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="123 Main Street, City, State, ZIP Code"
                />
                {errors.address && <p className={styles.error}>{errors.address}</p>}
              </div>

              {/* Sales Representative Dropdown */}
              <div className={styles.formGroup}>
                <label>Sales Representative</label>
                <select
                  name="sale_rep"
                  value={formData.sale_rep}
                  onChange={handleChange}
                  className={styles.selectInput}
                >
                  <option value="">Select a sales representative</option>
                  {salesRepresentatives.map((rep) => (
                    <option key={rep} value={rep}>
                      {rep}
                    </option>
                  ))}
                </select>
                {errors.sale_rep && <p className={styles.error}>{errors.sale_rep}</p>}
              </div>

              {/* Password */}
              <div className={styles.formGroup}>
                <label>Password</label>
                <div className={styles.passwordInput}>
                  <Lock className={styles.inputIcon} size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    style={{ paddingLeft: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.passwordToggle}
                  >
                    {showPassword ? <EyeOff className={styles.eyeIcon} /> : <Eye className={styles.eyeIcon} />}
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
                      Password Strength: {strengthInfo.text}
                    </span>
                  </div>
                )}
                
                {errors.password && <p className={styles.error}>{errors.password}</p>}
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className={styles.passwordRequirements}>
                  <h4>Password Requirements:</h4>
                  <ul>
                    <li style={{ color: formData.password.length >= 8 ? '#10b981' : '#64748b' }}>
                      {formData.password.length >= 8 ? '✓' : '○'} At least 8 characters
                    </li>
                    <li style={{ color: /[a-z]/.test(formData.password) ? '#10b981' : '#64748b' }}>
                      {/[a-z]/.test(formData.password) ? '✓' : '○'} One lowercase letter
                    </li>
                    <li style={{ color: /[A-Z]/.test(formData.password) ? '#10b981' : '#64748b' }}>
                      {/[A-Z]/.test(formData.password) ? '✓' : '○'} One uppercase letter
                    </li>
                    <li style={{ color: /\d/.test(formData.password) ? '#10b981' : '#64748b' }}>
                      {/\d/.test(formData.password) ? '✓' : '○'} One number
                    </li>
                    <li style={{ color: /[^A-Za-z0-9]/.test(formData.password) ? '#10b981' : '#64748b' }}>
                      {/[^A-Za-z0-9]/.test(formData.password) ? '✓' : '○'} One special character (recommended)
                    </li>
                  </ul>
                </div>
              )}

              {/* Confirm Password */}
              <div className={styles.formGroup}>
                <label>Confirm Password</label>
                <div className={styles.passwordInput}>
                  <Lock className={styles.inputIcon} size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    style={{ paddingLeft: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={styles.passwordToggle}
                  >
                    {showConfirmPassword ? <EyeOff className={styles.eyeIcon} /> : <Eye className={styles.eyeIcon} />}
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

              {/* Terms Agreement */}
              <div className={styles.termsGroup}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label>
                  I agree to the{' '}
                  <span className={styles.termsLink} onClick={toggleTermsModal}>Terms of Service</span>{' '}
                  and{' '}
                  <span>Privacy Policy</span>
                </label>
              </div>
              {errors.agreeToTerms && <p className={styles.error}>{errors.agreeToTerms}</p>}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? (
                  <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Sign In Link */}
              <div className={styles.signinLink}>
                <p>
                  Already have an account?{' '}
                  <a href='/login'>Sign in here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Terms of Service</h2>
              <button onClick={toggleTermsModal} className={styles.closeButton}>
                <X className={styles.closeIcon} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.termsContent}>
                <h3>Enrichify - Terms of Service</h3>
                
                <p><strong>Upon purchase of an email database list and List Integrity Policy:</strong> An email containing download information will be provided for you to download directly to your computer within 3–4 business days from time of purchase. There is no guarantee that all the email addresses are still valid, but all were valid at one time or another. Each list was generated, obtained, and created over a certain period of time. Some may have been generated from co-registration services, through online surveys, and third-party data providers. Email addresses may also have been acquired from vendors advertising to visitors requesting information about business opportunities. We do not guarantee the accuracy of leads, including deliverability, phone numbers, mailing addresses, names, or email addresses. We also do not guarantee performance or results. By purchasing, you agree to a no refund policy. We may provide extra leads to offset inaccuracies.</p>
                
                <p><strong>Payment, Financial Agreement, Refund Policy, Chargebacks:</strong> All payment information provided is assumed to be accurate and lawfully yours to use. All sales are final. Any attempt to reverse payment or chargeback without authorization may result in legal action and prosecution for theft of services.</p>
                
                <p><strong>Breach & Fees:</strong> In the event of default or breach, the client agrees to pay for all actual and consequential damages, including legal fees and collection costs incurred by Enrichify.</p>
                
                <p><strong>Minors:</strong> Enrichify does not knowingly collect information from anyone under 18 years of age. Any such data will be deleted upon discovery.</p>
                
                <p><strong>Right to Refuse Service:</strong> Enrichify reserves the right to refuse service to any party at any time, based on our internal policies regarding ethical marketing practices.</p>
                
                <p><strong>Jurisdiction:</strong> Any legal dispute will be governed by the laws of the State of Indiana, with exclusive jurisdiction in Marion County, Indiana.</p>
                
                <p><strong>No Other Warranties:</strong> All services and data are provided "as is" without warranty of any kind. No oral or written communication from Enrichify shall create any additional warranty. We are not liable for any loss or damages related to the use of our services.</p>
                
                <p><strong>Indemnification:</strong> You agree to hold Enrichify harmless from any liability, loss, or expense resulting from your use of our data or services.</p>
                
                <p><strong>Limitation of Liability:</strong> Under no circumstances shall Enrichify or its affiliates be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our data or services.</p>
                
                <p><strong>Entire Agreement:</strong> This agreement constitutes the entire understanding between you and Enrichify and supersedes all prior agreements, whether oral or written.</p>
                
                <p><strong>Legal Compliance:</strong> You agree to comply with all applicable laws, including CAN-SPAM, TCPA, and any applicable data privacy laws. Enrichify is not responsible for how you use the data after purchase.</p>
                
                <p>By purchasing and using our services, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service.</p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={toggleTermsModal} className={styles.modalCloseButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;