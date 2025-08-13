import React, { useState } from 'react';
import { Eye, EyeOff, Database, Shield, Zap, Globe } from 'lucide-react';
import styles from './LoginPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    return newErrors;
  };

  const handleSubmit = async () => {
    
    
   try{
let response=await axios.post(`https://datazapptoolbackend.vercel.app/forgetpassword`,formData)
alert("Reset password link sent")

   }catch(e){
if(e?.response.data.error){
  alert(e?.response?.data?.error)
}else{
  alert("Client error please try again")
}
   }
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

              {/* Password */}
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

              {/* Forgot Password Link */}
              {/* <div className={styles.forgot}>
                <span className={styles.forgotLink}>Forgot your password?</span>
              </div> */}

              {/* Submit Button */}
              <button
  type="button"
  onClick={handleSubmit}
  style={{marginTop:'1rem'}}
  disabled={isSubmitting}
  className={styles.submitButton}
>
  {isSubmitting ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div className={styles.spinner}></div>
      Sending link...
    </div>
  ) : (
    'Send reset link'
  )}
</button>

           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;