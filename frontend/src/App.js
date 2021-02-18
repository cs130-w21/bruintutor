import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CoverPage from "./pages/CoverPage";
import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const [uid, setUid] = useState("");
  const [userStore, setUserStore] = useState({
    test: {
      uid: "test",
      firstName: "Joe",
      lastName: "Bruin",
    },
    test2: {
      uid: "test2",
      firstName: "Paul",
      lastName: "Eggert",
    },
  });
  const [contacts, setContacts] = useState(["test2"]);
  const [matchedTutors, setMatchedTutors] = useState(["test2"]);
  useEffect(() => {
    // TO DO: fetch uid from the server
    setUid("test");
  }, []);

  console.log(uid);

  return (
    <Router>
      <div id="app">
        <Switch>
          <Route
            exact
            path="/"
            render={({ match }) => <CoverPage uid={uid} match={match} />}
          />
          <Route
            exact
            path="/auth"
            render={({ match }) => (
              <AuthPage uid={uid} setUid={setUid} match={match} />
            )}
          />
          <Route
            exact
            path="/profile/:id"
            render={({ match }) => (
              <ProfilePage
                uid={uid}
                userStore={userStore}
                contacts={contacts}
                match={match}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={({ match }) => <SearchPage uid={uid} match={match} />}
          />
          <Route
            exact
            path="/edit_profile/:id"
            render={({ match }) => <EditProfilePage uid={uid} match={match} />}
          />
          <Route
            exact
            path="/reset/:secret"
            render={({ match }) => (
              <ResetPasswordPage uid={uid} match={match} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
