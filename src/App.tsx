import {useState} from "react";
import {Routes, Route} from "react-router-dom";

import AuthPage from "./pages/authorization";
import {IUser} from "./utils/types";

function App() {
  const [user, setUser] = useState<IUser>({login: ""});

  return (
    <Routes>
      <Route path="/" element={<AuthPage setUser={setUser} />} />
      <Route path="/profile" element={<p>Profile</p>} />
    </Routes>
  );
}

export default App;
