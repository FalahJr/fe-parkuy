import React, { useReducer, useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { pengendaraService, storageService } from "../../../services";
import { initialState, reducer } from "./ProfilePengendara.reducer";
import "./ProfilePengendara.css";

export default function ProfilePengendara() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [pengendaraId, setPengendaraId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cek token
    const token = storageService.getToken();
    if (!token) {
      navigate("/pengendara/login");
      return;
    }

    // Ambil id_pengendara dari localStorage
    const idPengendara = localStorage.getItem("ID_PENGENDARA");
    if (idPengendara) {
      fetchPengendaraProfile(idPengendara);
    } else {
      // Jika tidak ada id_pengendara, redirect ke login
      navigate("/pengendara/login");
    }
  }, [navigate]);

  const fetchPengendaraProfile = async (userId: string) => {
    try {
      const response = await pengendaraService.getDetailPengendara(userId);

      if (response.data) {
        const profile = response.data;
        setPengendaraId(profile.id_pengendara);

        // Pre-fill form dengan data yang ada
        dispatch({
          type: "SET_INPUTS",
          payload: {
            fullName: profile.fullName || "",
            phone: profile.phone || "",
            cityName: profile.cityName || "",
            address: profile.address || "",
            nopol: profile.nopol || "",
            jenis_kendaraan: profile.jenis_kendaraan || "",
          },
        });
      }
    } catch (err: any) {
      console.error("Fetch profile error:", err);
      // Jika 404, berarti profil belum ada (first time user)
      if (err.response?.status !== 404) {
        setError("Gagal memuat profil. Silakan coba lagi.");
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_INPUTS",
      payload: { ...state.inputs, [name]: value },
    });
  };

  const validateForm = (): boolean => {
    // Validasi nomor telepon (hanya angka, 10-13 digit)
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(state.inputs.phone)) {
      setError("Nomor telepon harus 10-13 digit angka");
      return false;
    }

    // Validasi nomor polisi
    if (state.inputs.nopol.length < 3) {
      setError("Nomor polisi tidak valid");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    dispatch({ type: "SET_IS_SUBMITTED", payload: true });

    // Validasi form kosong
    const { fullName, phone, cityName, address, nopol, jenis_kendaraan } =
      state.inputs;
    if (
      !fullName ||
      !phone ||
      !cityName ||
      !address ||
      !nopol ||
      !jenis_kendaraan
    ) {
      setError("Semua field harus diisi");
      return;
    }

    // Validasi form
    if (!validateForm()) {
      return;
    }

    try {
      dispatch({ type: "SET_SENDING", payload: true });

      // Ambil id_pengendara dari state atau localStorage
      let targetId = pengendaraId;
      if (!targetId) {
        targetId = localStorage.getItem("ID_PENGENDARA") || "";
      }

      if (!targetId) {
        setError("ID Pengendara tidak ditemukan. Silakan login kembali.");
        return;
      }

      const response = await pengendaraService.updatePengendaraProfile(
        targetId,
        state.inputs,
      );

      if (response.data.statusCode === 200 || response.status === 200) {
        setSuccess(true);

        // Redirect ke home/dashboard setelah 2 detik
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err: any) {
      console.error("Update profile error:", err);
      setError(
        err.response?.data?.message ||
          "Gagal menyimpan profil. Silakan coba lagi.",
      );
    } finally {
      dispatch({ type: "SET_SENDING", payload: false });
    }
  };

  const handleLogout = () => {
    storageService.removeToken();
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("ID_PENGENDARA");
    navigate("/pengendara/login");
  };

  if (state.loading) {
    return (
      <div className="profile-pengendara-container">
        <div className="profile-pengendara-loading">
          <div className="profile-pengendara-spinner-large"></div>
          <p>Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-pengendara-container">
      <div className="profile-pengendara-wrapper">
        <div className="profile-pengendara-card">
          {/* Header */}
          <div className="profile-pengendara-header">
            <div className="profile-pengendara-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h1 className="profile-pengendara-title">Lengkapi Profil</h1>
            <p className="profile-pengendara-subtitle">
              Isi data diri Anda untuk melanjutkan
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="profile-pengendara-form">
            {error && (
              <div className="profile-pengendara-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                {error}
              </div>
            )}

            {success && (
              <div className="profile-pengendara-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Profil berhasil disimpan! Mengalihkan...
              </div>
            )}

            {/* Nama Lengkap */}
            <div className="profile-pengendara-input-group">
              <label className="profile-pengendara-label">Nama Lengkap *</label>
              <div className="profile-pengendara-input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="profile-pengendara-input-icon"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <input
                  type="text"
                  name="fullName"
                  value={state.inputs.fullName}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className={`profile-pengendara-input ${
                    state.isSubmitted && !state.inputs.fullName ? "error" : ""
                  }`}
                  disabled={state.sending}
                />
              </div>
            </div>

            {/* Nomor Telepon */}
            <div className="profile-pengendara-input-group">
              <label className="profile-pengendara-label">
                Nomor Telepon *
              </label>
              <div className="profile-pengendara-input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="profile-pengendara-input-icon"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <input
                  type="tel"
                  name="phone"
                  value={state.inputs.phone}
                  onChange={handleChange}
                  placeholder="Contoh: 081234567890"
                  className={`profile-pengendara-input ${
                    state.isSubmitted && !state.inputs.phone ? "error" : ""
                  }`}
                  disabled={state.sending}
                />
              </div>
            </div>

            {/* Kota */}
            <div className="profile-pengendara-input-group">
              <label className="profile-pengendara-label">Kota *</label>
              <div className="profile-pengendara-input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="profile-pengendara-input-icon"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <input
                  type="text"
                  name="cityName"
                  value={state.inputs.cityName}
                  onChange={handleChange}
                  placeholder="Contoh: Surabaya"
                  className={`profile-pengendara-input ${
                    state.isSubmitted && !state.inputs.cityName ? "error" : ""
                  }`}
                  disabled={state.sending}
                />
              </div>
            </div>

            {/* Alamat */}
            <div className="profile-pengendara-input-group">
              <label className="profile-pengendara-label">
                Alamat Lengkap *
              </label>
              <textarea
                name="address"
                value={state.inputs.address}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
                className={`profile-pengendara-textarea ${
                  state.isSubmitted && !state.inputs.address ? "error" : ""
                }`}
                rows={3}
                disabled={state.sending}
              />
            </div>

            {/* Nomor Polisi */}
            <div className="profile-pengendara-input-group">
              <label className="profile-pengendara-label">Nomor Polisi *</label>
              <div className="profile-pengendara-input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="profile-pengendara-input-icon"
                >
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
                <input
                  type="text"
                  name="nopol"
                  value={state.inputs.nopol}
                  onChange={handleChange}
                  placeholder="Contoh: B 1234 XYZ"
                  className={`profile-pengendara-input ${
                    state.isSubmitted && !state.inputs.nopol ? "error" : ""
                  }`}
                  disabled={state.sending}
                />
              </div>
            </div>

            {/* Jenis Kendaraan */}
            <div className="profile-pengendara-input-group">
              <label className="profile-pengendara-label">
                Jenis Kendaraan *
              </label>
              <div className="profile-pengendara-input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="profile-pengendara-input-icon"
                >
                  <path d="M12 2L6 6v2h12V6l-6-4zm-2 18v-6h4v6h5V9H5v11h5zm1-8h2v2h-2v-2z" />
                </svg>
                <select
                  name="jenis_kendaraan"
                  value={state.inputs.jenis_kendaraan}
                  onChange={handleChange}
                  className={`profile-pengendara-select ${
                    state.isSubmitted && !state.inputs.jenis_kendaraan
                      ? "error"
                      : ""
                  }`}
                  disabled={state.sending}
                >
                  <option value="">Pilih jenis kendaraan</option>
                  <option value="Motor">Motor</option>
                  <option value="Mobil">Mobil</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="profile-pengendara-buttons">
              <button
                type="submit"
                className="profile-pengendara-button primary"
                disabled={state.sending || success}
              >
                {state.sending ? (
                  <>
                    <span className="profile-pengendara-spinner"></span>
                    Menyimpan...
                  </>
                ) : success ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    Tersimpan!
                  </>
                ) : (
                  "Simpan Profil"
                )}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="profile-pengendara-button secondary"
                disabled={state.sending}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
