import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div id="app">
        <Switch>
          <Route exact path="/">
            <AuthPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/search">
            <SearchPage />
          </Route>
          <Route exact path="/edit_profile">
            <EditProfilePage />
          </Route>
          <Route exact path="/reset">
            <ResetPasswordPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
