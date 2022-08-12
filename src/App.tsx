import {useEffect, useState} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";

import AuthPage from "./pages/authorization";
import ProfilePage from "./pages/profile";
import {IUser} from "./utils/types";

function App() {
  const [user, setUser] = useState<IUser>({login: ""});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.login) {
      navigate("/", {replace: true});
    }
  }, [user.login, navigate]);

  return (
    <Routes>
      <Route path="/" element={<AuthPage setUser={setUser} />} />
      <Route path="/profile" element={<ProfilePage login={user.login} />} />
    </Routes>
  );
}

export default App;
