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
      major: "Computer Science",
      year: 3,
      rating: 3,
      classes: [
        "CS 111",
        "COMSCI 131",
        "CS 130",
        "MATH 143",
        "CS 111",
        "CHEM 131",
        "CS 130",
        "PHYSICS 143",
        "CS 111",
      ],
    },
    test2: {
      uid: "test2",
      firstName: "First",
      lastName: "Last",
      major: "Biology",
      year: 4,
      rating: 3,
      classes: [
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
      ],
    },
    test3: {
      uid: "test3",
      firstName: "First",
      lastName: "Last",
      major: "Biology",
      year: 4,
      rating: 4,
      classes: [
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
      ],
    },
    test4: {
      uid: "test4",
      firstName: "First",
      lastName: "Last",
      major: "Biology",
      year: 4,
      rating: 1,
      classes: [
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
      ],
    },
    test5: {
      uid: "test5",
      firstName: "First",
      lastName: "Last",
      major: "Biology",
      year: 4,
      rating: 5,
      classes: [
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
        "CS130",
      ],
    },
  });
  const [contacts, setContacts] = useState([
    "test2",
    "test3",
    "test4",
    "test5",
  ]);
  const [matchedTutors, setMatchedTutors] = useState([
    "test2",
    "test3",
    "test4",
    "test5",
  ]);
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
            render={({ match }) => (
              <SearchPage
                uid={uid}
                match={match}
                userStore={userStore}
                matchedTutors={matchedTutors}
              />
            )}
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
