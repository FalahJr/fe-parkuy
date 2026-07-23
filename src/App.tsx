import React, { Suspense, lazy } from "react";
import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import Home from "./screen/Public/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./screen/Auth/Login"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout/AdminLayout"));
const Overview = lazy(() => import("./screen/Admin/Overview/Overview"));
const ApplicationFile = lazy(
  () => import("./screen/Admin/ApplicationFile/ApplicationFile"),
);
const Location = lazy(() => import("./screen/Admin/Location/Location"));
const ParkingAttendants = lazy(
  () => import("./screen/Admin/ParkingAttendants/ParkingAttendants"),
);
const ParkirIn = lazy(() => import("./screen/Admin/ParkirIn/ParkirIn"));
const ParkirOut = lazy(() => import("./screen/Admin/ParkirOut/ParkirOut"));
const LoginPengendara = lazy(
  () => import("./screen/Pengendara/LoginPengendara/LoginPengendara"),
);
const RegisterPengendara = lazy(
  () => import("./screen/Pengendara/RegisterPengendara/RegisterPengendara"),
);
const ProfilePengendara = lazy(
  () => import("./screen/Pengendara/ProfilePengendara/ProfilePengendara"),
);
const EditProfilePengendara = lazy(
  () => import("./screen/Pengendara/EditProfilePengendara/EditProfilePengendara"),
);
const LocationSearch = lazy(
  () => import("./screen/Pengendara/LocationSearch/LocationSearch"),
);

const RouteFallback: React.FC = () => (
  <div style={{ minHeight: "100vh", background: "#f6f9fc" }} />
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/auth/login" element={<Login />} />

          <Route path="/pengendara/login" element={<LoginPengendara />} />
          <Route path="/pengendara/register" element={<RegisterPengendara />} />
          <Route path="/pengendara/profile" element={<ProfilePengendara />} />
          <Route
            path="/pengendara/edit-profile"
            element={<EditProfilePengendara />}
          />
          <Route
            path="/pengendara/location-search"
            element={<LocationSearch />}
          />

          <Route path="/admin/" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="berkas" element={<ApplicationFile />} />
            <Route path="parkir/lokasi" element={<Location />} />
            <Route path="parkir/petugas" element={<ParkingAttendants />} />
            <Route path="transaksi/parkir-masuk" element={<ParkirIn />} />
            <Route path="transaksi/parkir-keluar" element={<ParkirOut />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
