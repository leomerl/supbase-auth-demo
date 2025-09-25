import { useState, useEffect } from 'react';
import styles from './SignUpForm.module.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword && confirmPassword.length > 0;
  };

  useEffect(() => {
    const newErrors = {};

    if (touched.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (touched.password && !validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (touched.confirmPassword && !validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    const isValid =
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      validatePasswordMatch(formData.password, formData.confirmPassword);

    setIsFormValid(isValid);
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully! (No actual submission)');
  };

  const getInputClass = (fieldName) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? styles.invalid : styles.valid;
  };

  return (
    <div className={styles.formContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('email')}
            required
          />
          {errors.email && touched.email && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('password')}
            required
          />
          {errors.password && touched.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('confirmPassword')}
            required
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" disabled={!isFormValid} className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;