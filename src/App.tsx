import React from "react";
import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import Home from "./screen/Public/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screen/Auth/Login";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import Overview from "./screen/Admin/Overview/Overview";
import ApplicationFile from "./screen/Admin/ApplicationFile/ApplicationFile";
import Location from "./screen/Admin/Location/Location";
import ParkingAttendants from "./screen/Admin/ParkingAttendants/ParkingAttendants";
import ParkirIn from "./screen/Admin/ParkirIn/ParkirIn";
import ParkirOut from "./screen/Admin/ParkirOut/ParkirOut";
import LoginPengendara from "./screen/Pengendara/LoginPengendara/LoginPengendara";
import RegisterPengendara from "./screen/Pengendara/RegisterPengendara/RegisterPengendara";
import ProfilePengendara from "./screen/Pengendara/ProfilePengendara/ProfilePengendara";
import EditProfilePengendara from "./screen/Pengendara/EditProfilePengendara/EditProfilePengendara";
import LocationSearch from "./screen/Pengendara/LocationSearch/LocationSearch";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth/login" element={<Login />}>
          <Route path="/auth/login" element={<h1>Masuk</h1>} />
        </Route>
        {/* Pengendara Routes */}
        <Route path="/pengendara/login" element={<LoginPengendara />} />
        <Route path="/pengendara/register" element={<RegisterPengendara />} />
        <Route
          path="/pengendara/profile"
          element={<ProfilePengendara />}
        />{" "}
        <Route
          path="/pengendara/edit-profile"
          element={<EditProfilePengendara />}
        />
        <Route
          path="/pengendara/location-search"
          element={<LocationSearch />}
        />
        <Route path="/admin/" element={<AdminLayout />}>
          <Route path="/admin/" element={<Overview />} />
          <Route path="/admin/berkas" element={<ApplicationFile />} />
          <Route path="/admin/parkir/lokasi" element={<Location />} />
          <Route path="/admin/parkir/petugas" element={<ParkingAttendants />} />
          <Route path="/admin/transaksi/parkir-masuk" element={<ParkirIn />} />
          <Route
            path="/admin/transaksi/parkir-keluar"
            element={<ParkirOut />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
