import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBuilding, cilLockLocked, cilMobile, cilUser } from '@coreui/icons';
import back from '../../../assets/images/back.webp';

import {signup} from '../../../api/auth'
import { Navigate, useNavigate } from 'react-router-dom';




const Register = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    Company: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Reset error
    setError('');

    try {
      const data = await signup(formData);  
      
      navigate('/login');
      // Handle success
      setSuccess('Account created successfully!');
      setFormData({
        Name: '',
        Email: '',
        Mobile: '',
        Company: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CContainer fluid style={{ padding: 0, margin: 0 }}>
      <CRow>
        <CCol
          md={8}
          style={{
            background: `url(${back})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></CCol>
        <CCol md={4} style={{ margin: 0, padding: 0 }}>
          <CCard className="vh-100 br-0">
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <h1>Register</h1>
                <p className="text-body-secondary">Create your account</p>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    name="Name"
                    placeholder="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    autoComplete="Name"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    name="Email"
                    placeholder="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    autoComplete="Email"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilMobile} />
                  </CInputGroupText>
                  <CFormInput
                    name="Mobile"
                    placeholder="Mobile"
                    value={formData.Mobile}
                    onChange={handleChange}
                    autoComplete="Mobile"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilBuilding} />
                  </CInputGroupText>
                  <CFormInput
                    name="Company"
                    placeholder="Company"
                    value={formData.Company}
                    onChange={handleChange}
                    autoComplete="company"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </CInputGroup>

                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </CInputGroup>

                <div className="d-grid">
                  <CButton color="primary" type="submit">
                    Create Account
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Register;
