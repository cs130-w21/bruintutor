import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils'
import { unmountComponentAtNode } from 'react-dom';
import AuthPage from '../pages/AuthPage';
import CoverPage from '../pages/CoverPage';
import EditProfilePage from '../pages/EditProfilePage';
import ProfilePage from '../pages/ProfilePage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ResetPwdFail from '../pages/ResetPwdFail';
import ResetPwdSuccess from '../pages/ResetPwdSuccess';
import SearchPage from '../pages/SearchPage';


let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

console.log('Running interface tests\n');

it('interfaces AuthPage', () => {
  act(() => {
    ReactDOM.render(<AuthPage />, container);
  });

  // Page frame
  expect(screen.getByText('BruinTutors')).toBeInTheDocument();
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  expect(screen.getByText('©2021 BruinTutors.com')).toBeInTheDocument();
  
  // Sign In
  expect(screen.getAllByText('Sign In')[0]).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getAllByText('Sign In')[1]).toBeInTheDocument();
  expect(screen.getByText('Forget Password')).toBeInTheDocument();
  expect(screen.getByText('Create Account')).toBeInTheDocument();
  
  // Sign Up
  act(() => {
    screen.getByText('Create Account').dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(screen.getByText('Create Account')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByText('I want to be a tutor')).toBeInTheDocument();
  expect(screen.getByText('Create')).toBeInTheDocument();
  expect(screen.getByText('Already have an account?')).toBeInTheDocument();

  // Forgot Password
  act(() => {
    screen.getByText('Already have an account?').dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  act(() => {
    screen.getByText('Forget Password').dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(screen.getByText('Forgot Password')).toBeInTheDocument();
  expect(screen.getByText('Please enter the email associated with your account below. We’ll send your password reset link right away')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByText('Send')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});

it('interfaces CoverPage', () => {
  act(() => {
    ReactDOM.render(<CoverPage />, container);
  });
  expect(screen.getByText('BruinTutors')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  expect(screen.getByText('©2021 BruinTutors.com')).toBeInTheDocument();
});

it('interfaces EditProfilePage', () => {
  act(() => {
    ReactDOM.render(<EditProfilePage />, container);
  });

  // Page frame
  expect(screen.getByText('BruinTutors')).toBeInTheDocument();
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  expect(screen.getByText('©2021 BruinTutors.com')).toBeInTheDocument();

  // Edit Profile
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Major')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Year')).toBeInTheDocument();
  expect(screen.getByText('Classes')).toBeInTheDocument();
  expect(screen.getByText('Select...')).toBeInTheDocument();
  expect(screen.getByText('Save Changes')).toBeInTheDocument();
});

it('interfaces ProfilePage', () => {
  act(() => {
    ReactDOM.render(<ProfilePage match={{'params': {'id': 0}}} uid={1}/>, container);
  });

  // Page frame
  expect(screen.getByText('BruinTutors')).toBeInTheDocument();
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  expect(screen.getByText('©2021 BruinTutors.com')).toBeInTheDocument();
  
  // Profile Page
  expect(screen.getByText('Send Message')).toBeInTheDocument();
});

it('interfaces ResetPasswordPage', () => {
  act(() => {
    ReactDOM.render(<ResetPasswordPage />, container);
  });

  // Page frame
  expect(screen.getByText('BruinTutors')).toBeInTheDocument();
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  expect(screen.getByText('©2021 BruinTutors.com')).toBeInTheDocument();
  
  // Reset Password
  expect(screen.getByText('Reset Password')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByText('Change')).toBeInTheDocument();
});

it('interfaces ResetPwdFail', () => {
  act(() => {
    ReactDOM.render(<ResetPwdFail />, container);
  });

  // Page frame
  expect(screen.getByText('BruinTutors')).toBeInTheDocument();
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  expect(screen.getByText('©2021 BruinTutors.com')).toBeInTheDocument();
  
  // Password Fail
  expect(screen.getByText('Reset')).toBeInTheDocument();
  expect(screen.getByText('Reset password fail! Please try again.')).toBeInTheDocument();
});

it('interfaces ResetPwdSuccess', () => {
  act(() => {
    ReactDOM.render(<ResetPwdSuccess />, container);
  });

  // Page frame
  expect(screen.getByText('BruinTutors')).toBeInTheDocument();
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  expect(screen.getByText('©2021 BruinTutors.com')).toBeInTheDocument();
  
  // Password Success
  expect(screen.getByText('Sign In')).toBeInTheDocument();
  expect(screen.getByText('Your password is reset successfully!')).toBeInTheDocument();
});

it('interfaces SearchPage', () => {
  act(() => {
    ReactDOM.render(<SearchPage />, container);
  });

  // Page frame
  expect(screen.getByText('BruinTutors')).toBeInTheDocument();
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  expect(screen.getByText('©2021 BruinTutors.com')).toBeInTheDocument();
  
  // Search Page
  expect(screen.getByText('SearchPage')).toBeInTheDocument();
});