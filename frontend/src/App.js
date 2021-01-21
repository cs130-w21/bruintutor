import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import "./index.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AuthPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/edit_profile">
          <EditProfilePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
