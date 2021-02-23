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

console.log('Running integration tests\n');

it('integrates AuthPage', () => {
  act(() => {
    ReactDOM.render(<AuthPage />, container);
  });

  expect();
});

it('integrates CoverPage', () => {
  act(() => {
    ReactDOM.render(<CoverPage />, container);
  });
  
  expect();
});

it('integrates EditProfilePage', () => {
  act(() => {
    ReactDOM.render(<EditProfilePage />, container);
  });

  expect();
});

it('integrates ProfilePage', () => {
  act(() => {
    ReactDOM.render(<ProfilePage match={{'params': {'id': 0}}} uid={1}/>, container);
  });

  expect();
});

it('integrates ResetPasswordPage', () => {
  act(() => {
    ReactDOM.render(<ResetPasswordPage />, container);
  });

  expect();
});

it('integrates ResetPwdFail', () => {
  act(() => {
    ReactDOM.render(<ResetPwdFail />, container);
  });

  expect();
});

it('integrates ResetPwdSuccess', () => {
  act(() => {
    ReactDOM.render(<ResetPwdSuccess />, container);
  });

  expect();
});

it('integrates SearchPage', () => {
  act(() => {
    ReactDOM.render(<SearchPage />, container);
  });

  expect();
});