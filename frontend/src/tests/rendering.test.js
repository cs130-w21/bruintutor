import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import CalendarSection from '../components/CalendarSection';
import ClassBubble from '../components/ClassBubble';
import ContactSection from '../components/ContactSection';
import Course from '../components/Course';
import CourseSection from '../components/CourseSection';
import AppDropDown from '../components/DropDown';
import FooterOption from '../components/FooterOption';
import Frame from '../components/Frame';
import ImageUploader from '../components/ImageUploader';
import InfoSection from '../components/InfoSection';
import Line from '../components/Line';
import MsgSection from '../components/MsgSection';
import PageFrame from '../components/PageFrame';
import ProfileDescription from '../components/ProfileDescription';
import ProfileFrame from '../components/ProfileFrame';
import ProfileItem from '../components/ProfileItem';
import ProfilePicture from '../components/ProfilePicture';
import ProfileRow from '../components/ProfileRow';
import Text from '../components/Text';
import TextBox from '../components/TextBox';
import TextInput from '../components/TextInput';
import ToggleSwitch from '../components/ToggleSwitch';
import TouchableOpacity from '../components/TouchableOpacity';
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
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

console.log("Running unit tests\n");

it('renders AppButton', () => {
  ReactDOM.render(<AppButton />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders AppTextInput', () => {
  ReactDOM.render(<AppTextInput />, container);
  expect(container.querySelector('input')).toBeTruthy();
});

it('renders CalendarSection', () => {
  ReactDOM.render(<CalendarSection />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ClassBubble', () => {
  ReactDOM.render(<ClassBubble />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ContactSection', () => {
  ReactDOM.render(<ContactSection />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders Course', () => {
  ReactDOM.render(<Course />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders CourseSection', () => {
  ReactDOM.render(<CourseSection classes={["CS 111", "COMSCI 131"]} />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders AppDropDown', () => {
  ReactDOM.render(<AppDropDown />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders FooterOption', () => {
  ReactDOM.render(<FooterOption />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders Frame', () => {
  ReactDOM.render(<Frame />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ImageUploader', () => {
  ReactDOM.render(<ImageUploader />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders InfoSection', () => {
  ReactDOM.render(<InfoSection />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders Line', () => {
  ReactDOM.render(<Line />, container);
  expect(container.querySelector('hr')).toBeTruthy();
});

it('renders MsgSection', () => {
  ReactDOM.render(<MsgSection />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders PageFrame', () => {
  ReactDOM.render(<PageFrame />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ProfileDescription', () => {
  ReactDOM.render(<ProfileDescription />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ProfileFrame', () => {
  ReactDOM.render(<ProfileFrame />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ProfileItem', () => {
  ReactDOM.render(<ProfileItem />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ProfilePicture', () => {
  ReactDOM.render(<ProfilePicture />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ProfileRow', () => {
  ReactDOM.render(<ProfileRow />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders Text', () => {
  ReactDOM.render(<Text />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders TextBox', () => {
  ReactDOM.render(<TextBox />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders TextInput', () => {
  ReactDOM.render(<TextInput />, container);
  expect(container.querySelector('input')).toBeTruthy();
});

it('renders ToggleSwitch', () => {
  ReactDOM.render(<ToggleSwitch checked={false} onChange={()=>{}} />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders TouchableOpacity', () => {
  ReactDOM.render(<TouchableOpacity />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders AuthPage', () => {
  ReactDOM.render(<AuthPage />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders CoverPage', () => {
  ReactDOM.render(<CoverPage />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders EditProfilePage', () => {
  ReactDOM.render(<EditProfilePage />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ProfilePage', () => {
  ReactDOM.render(<ProfilePage match={{"params": {"id": 0}}} uid={1}/>, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ResetPasswordPage', () => {
  ReactDOM.render(<ResetPasswordPage />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ResetPwdFail', () => {
  ReactDOM.render(<ResetPwdFail />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders ResetPwdSuccess', () => {
  ReactDOM.render(<ResetPwdSuccess />, container);
  expect(container.querySelector('div')).toBeTruthy();
});

it('renders SearchPage', () => {
  ReactDOM.render(<SearchPage />, container);
  expect(container.querySelector('div')).toBeTruthy();
});
