
import React, {useState} from 'react';
import SignIn from './components/SignIn/SignIn';
import Header from './components/Header/Header';
import SubHeader from './components/SubHeader/SubHeader';
import FootHeader from './components/FootHeader/FootHeader';
// import RememberBox from './components/RememberBox/RememberBox';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
function App() {
return (
    // <Router>
    <div className="App">
      <Header/>
        <div className="container d-flex align-items-center flex-column">
          <SubHeader></SubHeader>
          <SignIn />
          {/* <RememberBox/> */}
          <FootHeader/>
       </div>
   </div>
  // </Router>
  )  
}

export default App;
