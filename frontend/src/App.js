import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CoverPage from "./pages/CoverPage";
import ResetPwdSuccess from "./pages/ResetPwdSuccess";
import ResetPwdFail from "./pages/ResetPwdFail";
import "./index.css";
import { NotificationTypes } from "./config.js";
import { useState, useEffect } from "react";
import {
  getNotifications,
  getContacts,
  getUid,
  getProfile,
  getSchedule,
  logOutRequest,
} from "./api";

function App() {
  const [uid, setUid] = useState("");
  const [notificationOn, setNotificationOn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userStore, setUserStore] = useState({});
  const [contacts, setContacts] = useState([]);
  const [matchedTutors, setMatchedTutors] = useState([]);

  useEffect(() => {
    getAuthState();
  }, []);

  useEffect(async () => {
    const newUsers = {};
    for (let id of contacts) {
      if (!(id in userStore)) {
        await retrieveProfile(id, newUsers);
      }
    }
    for (let id of matchedTutors) {
      if (!(id in userStore)) {
        await retrieveProfile(id, newUsers);
      }
    }
    for (let notif of notifications) {
      const uid = notif.from;
      if (uid) await retrieveProfile(uid, newUsers);
    }
    setUserStore({ ...userStore, ...newUsers });
  }, [contacts, matchedTutors, notifications]);

  useEffect(async () => {
    if (uid) {
      await retrieveNotifications(uid);
      await retrieveContacts(uid);
    }
  }, [uid]);

  const removeNotification = (notificationID) => {
    let newNotifications = [...notifications];
    newNotifications = newNotifications.filter(
      (notif) => notif.notificationID !== notificationID
    );
    setNotifications(newNotifications);
  };

  const retrieveProfile = async (uid, newUsers) => {
    console.log(uid);
    const res = await getProfile(uid);
    const schRes = await getSchedule(uid);
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      const info = res.data;
      const schedule = schRes.data;
      info.uid = uid;
      if (schedule.bytes.length > 0) info.schedule = schedule.bytes;
      else info.schedule = Array(42).fill(0);
      newUsers[uid] = info;
    }
  };

  const retrieveNotifications = async (uid) => {
    const res = await getNotifications(uid);
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      const data = res.data;
      if (data.notification) setNotifications(data.notification);
    }
  };

  const retrieveContacts = async (uid) => {
    const res = await getContacts(uid);
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      const data = res.data;
      if (data) setContacts(data);
    }
  };

  const getAuthState = async () => {
    const res = await getUid();
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      const data = res.data;
      setUid(data.uid);
    }
  };

  const logOut = async () => {
    const res = await logOutRequest();
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      setUid("");
    }
  };

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
                setUserStore={setUserStore}
                userStore={userStore}
                contacts={contacts}
                notifications={notifications}
                setNotificationOn={setNotificationOn}
                notificationOn={notificationOn}
                removeNotification={removeNotification}
                setContacts={setContacts}
                match={match}
                logOut={logOut}
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
                contacts={contacts}
                setContacts={setContacts}
                matchedTutors={matchedTutors}
                setMatchedTutors={setMatchedTutors}
                notifications={notifications}
                setNotificationOn={setNotificationOn}
                notificationOn={notificationOn}
                removeNotification={removeNotification}
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
          <Route
            exact
            path="/result/success"
            render={({ match }) => <ResetPwdSuccess uid={uid} match={match} />}
          />
          <Route
            exact
            path="/result/failure"
            render={({ match }) => <ResetPwdFail uid={uid} match={match} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
