import AppBar from "./components/AppBar";
import Home from "./pages/Home";
import Group from "./pages/Group";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import Notifications from "./pages/Notifications";
import Post from "./pages/Post";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import { currUser } from "./reducers/user";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";

import './style.css';

/*
* App - just as it sounds - builds the app at its highest level
* Renders the AppBar so that it persists on all pages, and will switch its main content based on route
* 
* The routes defined by app include: Home, Group, Post (unused), Notifications (unused), Settings, and Profile
*/

function App() {
  const user = useSelector(currUser);

  return user != null ? (
    <Router>
      <AppBar />
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":groupId/*" element={<Group />} />
          {/* will need to update the below to rely on some post id -- path might look like /group1/subgroup2/11111 */}
          <Route path="post" element={<Post />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} >
          </Route>
        </Routes>
      </div>
    </Router>
  ) : (
    <Router>
      <div className="authContent">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

