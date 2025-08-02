import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import back from '../../../assets/images/back.webp'

import {login} from '../../../api/auth'

const Login = () => {

  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const credentials = { Email, password };
      await login(credentials);
      navigate('/dashboard');  // Redirect to home after successful login
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
      <CContainer fluid style={{padding:0 , margin:0 }}>
        <CRow>
        <CCol md={8} style={{background:`url(${back})`, backgroundPosition:'center', backgroundRepeat:' no-repeat', backgroundSize: 'cover'}}>
        </CCol>
          <CCol md={4} style={{margin:0 , padding:0}}>
            <CCardGroup className='br-0'>
              <CCard className='vh-100 br-0'>

                <div className='w-50 mx-2 my-lg-5'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 146 30" fill="none">
                                    <g clipPath="url(#clip0_486_4438)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0 14.9803C0 12.6947 0.260828 10.6795 0.782484 8.93458C1.32959 7.18802 2.0739 5.71181 3.01861 4.50593C3.96331 3.30006 5.06865 2.36288 6.33621 1.69441C7.62921 1.02593 9.03196 0.627797 10.5476 0.5V4.35192C9.72697 4.47972 8.95721 4.77627 8.23675 5.23831C7.5163 5.67412 6.88172 6.31638 6.33621 7.16345C5.78911 8.01051 5.35492 9.08859 5.03207 10.3993C4.73466 11.6838 4.57244 13.2108 4.54699 14.982C4.57244 16.7793 4.73307 18.3194 5.03207 19.604C5.35492 20.8885 5.7907 21.9666 6.33621 22.8398C6.88331 23.7131 7.5163 24.3799 8.23675 24.842C8.98266 25.304 9.75242 25.5858 10.5476 25.689V29.464C9.03196 29.3607 7.62762 28.9757 6.33621 28.3089C5.06865 27.642 3.96331 26.7049 3.01861 25.4973C2.0739 24.2898 1.32959 22.8136 0.782484 21.0687C0.260828 19.2943 0 17.2659 0 14.9803ZM12.076 25.6874C12.8219 25.6104 13.5169 25.4056 14.1626 25.0714C14.8338 24.7371 15.4429 24.2505 15.9884 23.6082L19.0818 26.4198C18.1371 27.3701 17.081 28.1008 15.9137 28.6153C14.7463 29.1281 13.466 29.4246 12.0744 29.5016V25.689L12.076 25.6874ZM15.99 6.39339C15.4191 5.72655 14.8099 5.2252 14.1642 4.89096C13.5185 4.55672 12.8219 4.36503 12.0776 4.3126V0.5C14.8608 0.627797 17.1971 1.64198 19.085 3.54254L15.9916 6.39175L15.99 6.39339Z" fill="#333"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M38.7776 26.1871L39.8591 29.3067H32.7404L33.7837 26.1871H38.7776ZM48.0083 29.3067H43.3866L36.2679 8.04819L29.0745 29.3067H24.4146L34.0302 0.962036H38.4659L48.0083 29.3067Z" fill="#3245EC"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M126.133 29.3067V0.92435H130.68V29.3083H126.133V29.3067ZM141.453 0.92435H146V29.3083H141.453L132.21 12.5162V3.65723L141.453 20.4871V0.92435ZM109.137 0.5C110.653 0.577006 112.057 0.948927 113.349 1.6174C114.666 2.28424 115.797 3.23452 116.741 4.46661C117.71 5.67412 118.468 7.16181 119.015 8.93458C119.563 10.6811 119.836 12.6964 119.836 14.9803C119.836 17.2643 119.563 19.2943 119.015 21.0654C118.468 22.8366 117.711 24.339 116.741 25.5711C115.797 26.7786 114.678 27.7141 113.387 28.3826C112.096 29.0249 110.679 29.3968 109.137 29.5V25.6874C109.982 25.5842 110.777 25.3155 111.523 24.878C112.269 24.416 112.915 23.7606 113.462 22.9136C114.009 22.0403 114.443 20.9622 114.766 19.6777C115.089 18.3686 115.262 16.8023 115.288 14.9787C115.262 13.1551 115.089 11.6019 114.766 10.319C114.443 9.00994 113.996 7.93186 113.424 7.08316C112.876 6.20989 112.231 5.55616 111.485 5.1187C110.739 4.65667 109.956 4.38633 109.137 4.30932V0.5ZM96.9485 14.9803C96.9485 12.6947 97.2093 10.6795 97.731 8.93458C98.2781 7.16345 99.0224 5.67412 99.9671 4.46661C100.936 3.23452 102.066 2.29734 103.359 1.65508C104.676 0.988249 106.105 0.60322 107.646 0.5V4.35192C106.801 4.45514 106.006 4.72384 105.26 5.1613C104.514 5.59712 103.868 6.23938 103.321 7.08644C102.774 7.9335 102.34 9.01158 102.017 10.3223C101.694 11.6314 101.521 13.1846 101.495 14.982C101.521 16.8055 101.694 18.3719 102.017 19.681C102.34 20.9655 102.776 22.0436 103.321 22.9168C103.892 23.7901 104.551 24.4569 105.297 24.919C106.042 25.3548 106.825 25.612 107.644 25.689V29.5016C106.128 29.3984 104.711 29.0265 103.394 28.3842C102.078 27.7174 100.934 26.7802 99.9655 25.5727C99.0208 24.3406 98.2765 22.8382 97.7294 21.0671C97.2077 19.2959 96.9469 17.2676 96.9469 14.982L96.9485 14.9803ZM90.6489 29.3067H86.1019V0.92435H90.6489V29.3083V29.3067ZM74.6207 0.92435H79.1677V29.3083H74.6207V9.78164L68.4705 25.5711H67.2412V18.5226L74.6207 0.92435ZM53.7847 0.92435H58.3317L65.7112 18.4472V25.5727H64.5184L58.3317 9.78328V29.3099H53.7847V0.92435Z" fill="#333"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_486_4438">
                                            <rect width="146" height="29" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                </div>

             
                <CCardBody>
                
                  <CForm>
                    <h1> Sign In </h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username"  onChange={(e) => setEmail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                      <div className="d-grid">
                    <CButton color="primary" onClick={signIn}>Sign in</CButton>
                  </div>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                    <CRow>
                    <CCol xs={12} className='d-flex justify-content-center mt-4'>
                    <Link to="/register">
                      {/* <CButton color="primary" className="mt-3" active tabIndex={-1}> */}
                      Sign Up
                      {/* </CButton> */}
                    </Link>
                    </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
         
        </CRow>
      </CContainer>
  )
}

export default Login
