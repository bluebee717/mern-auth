import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthLayout from "./layouts/AuthLayout";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmailWithCode from "./pages/auth/VerifyEmailWithCode";
import Secret from "./pages/secret/Secret";

import ProtectedRouteWrapper from "./components/ProtectedRouteWrapper";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmailWithCode />} />
        </Route>
        <Route
          path="/secret"
          element={
            <ProtectedRouteWrapper>
              <Secret />
            </ProtectedRouteWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;
