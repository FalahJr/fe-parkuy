import React, { useReducer, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { pengendaraService } from "../../../services";
import { initialState, reducer } from "./RegisterPengendara.reducer";
import "./RegisterPengendara.css";

export default function RegisterPengendara() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_INPUTS",
      payload: { ...state.inputs, [name]: value },
    });
  };

  const validateForm = (): boolean => {
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.inputs.email)) {
      setError("Format email tidak valid");
      return false;
    }

    // Validasi password minimal 6 karakter
    if (state.inputs.password.length < 6) {
      setError("Password minimal 6 karakter");
      return false;
    }

    // Validasi password match
    if (state.inputs.password !== state.inputs.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
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
    if (
      !state.inputs.email ||
      !state.inputs.password ||
      !state.inputs.confirmPassword
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

      const response = await pengendaraService.registerPengendara({
        email: state.inputs.email,
        password: state.inputs.password,
      });

      if (response.data.statusCode === 200 || response.status === 201) {
        setSuccess(true);

        // Redirect ke login setelah 2 detik
        setTimeout(() => {
          navigate("/pengendara/login");
        }, 2000);
      }
    } catch (err: any) {
      console.error("Register error:", err);
      setError(
        err.response?.data?.message ||
          "Registrasi gagal. Email mungkin sudah terdaftar.",
      );
    } finally {
      dispatch({ type: "SET_SENDING", payload: false });
    }
  };

  return (
    <div className="register-pengendara-container">
      <div className="register-pengendara-wrapper">
        <div className="register-pengendara-card">
          {/* Header */}
          <div className="register-pengendara-header">
            <div className="register-pengendara-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <h1 className="register-pengendara-title">Daftar Pengendara</h1>
            <p className="register-pengendara-subtitle">
              Buat akun baru untuk memulai
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="register-pengendara-form">
            {error && (
              <div className="register-pengendara-error">
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
              <div className="register-pengendara-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Registrasi berhasil! Mengalihkan ke halaman login...
              </div>
            )}

            {/* Email Input */}
            <div className="register-pengendara-input-group">
              <label className="register-pengendara-label">Email</label>
              <div className="register-pengendara-input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="register-pengendara-input-icon"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <input
                  type="email"
                  name="email"
                  value={state.inputs.email}
                  onChange={handleChange}
                  placeholder="Masukkan email Anda"
                  className={`register-pengendara-input ${
                    state.isSubmitted && !state.inputs.email ? "error" : ""
                  }`}
                  disabled={state.sending}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="register-pengendara-input-group">
              <label className="register-pengendara-label">Password</label>
              <div className="register-pengendara-input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="register-pengendara-input-icon"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                <input
                  type="password"
                  name="password"
                  value={state.inputs.password}
                  onChange={handleChange}
                  placeholder="Masukkan password (min. 6 karakter)"
                  className={`register-pengendara-input ${
                    state.isSubmitted && !state.inputs.password ? "error" : ""
                  }`}
                  disabled={state.sending}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="register-pengendara-input-group">
              <label className="register-pengendara-label">
                Konfirmasi Password
              </label>
              <div className="register-pengendara-input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="register-pengendara-input-icon"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                <input
                  type="password"
                  name="confirmPassword"
                  value={state.inputs.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password Anda"
                  className={`register-pengendara-input ${
                    state.isSubmitted && !state.inputs.confirmPassword
                      ? "error"
                      : ""
                  }`}
                  disabled={state.sending}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="register-pengendara-button"
              disabled={state.sending || success}
            >
              {state.sending ? (
                <>
                  <span className="register-pengendara-spinner"></span>
                  Memproses...
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
                  Berhasil!
                </>
              ) : (
                "Daftar"
              )}
            </button>

            {/* Login Link */}
            <div className="register-pengendara-footer">
              <p>
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/pengendara/login")}
                  className="register-pengendara-link"
                  disabled={state.sending}
                >
                  Login Sekarang
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
