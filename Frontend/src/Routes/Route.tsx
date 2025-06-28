import { Route, Routes } from "react-router";

import SignupPage from "../Authorization/Signup";
import Landing from "../Landing Page/Landing";
import LoginPage from "../Authorization/Login";
import DashBoard from "../Dashboard Components/DashBoard";
import Shared from "../Dashboard Components/Shared";
import NotFound404 from "../Dashboard Components/Notfound404";

const route = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/dashboard/:filter" element={<DashBoard/>}/>
        <Route path="/share/:hash" element={<Shared />}/>
        <Route path="/:random" element={<NotFound404/>}/>
    </Routes>
  )
}
export default route
