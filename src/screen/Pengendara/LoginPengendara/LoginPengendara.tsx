import React, { useReducer, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { pengendaraService, storageService } from "../../../services";
import { initialState, reducer } from "./LoginPengendara.reducer";
import "./LoginPengendara.css";

export default function LoginPengendara() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_INPUTS",
      payload: { ...state.inputs, [name]: value },
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    dispatch({ type: "SET_IS_SUBMITTED", payload: true });

    // Validasi
    if (!state.inputs.email || !state.inputs.password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      dispatch({ type: "SET_SENDING", payload: true });

      const response = await pengendaraService.loginPengendara({
        email: state.inputs.email,
        password: state.inputs.password,
      });

      //   console.log("Login response:", response.data.data.access_token);
      if (response.data.data.access_token) {
        // Simpan token
        storageService.setToken(response.data.data.access_token);

        // Simpan refresh token jika ada
        if (response.data.data.refresh_token) {
          localStorage.setItem(
            "REFRESH_TOKEN",
            response.data.data.refresh_token,
          );
        }

        // Simpan id_pengendara untuk digunakan di API calls berikutnya
        localStorage.setItem("ID_PENGENDARA", response.data.data.id_pengendara);

        // Redirect ke halaman profile untuk melengkapi data
        navigate("/pengendara/profile");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login gagal. Periksa kembali email dan password Anda.",
      );
    } finally {
      dispatch({ type: "SET_SENDING", payload: false });
    }
  };

  return (
    <div className="login-pengendara-container">
      <div className="login-pengendara-wrapper">
        <div className="login-pengendara-card">
          {/* Header */}
          <div className="login-pengendara-header">
            <div className="login-pengendara-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <h1 className="login-pengendara-title">Login Pengendara</h1>
            <p className="login-pengendara-subtitle">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-pengendara-form">
            {error && (
              <div className="login-pengendara-error">
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

            {/* Email Input */}
            <div className="login-pengendara-input-group">
              <label className="login-pengendara-label">Email</label>
              <div className="login-pengendara-input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="login-pengendara-input-icon"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <input
                  type="email"
                  name="email"
                  value={state.inputs.email}
                  onChange={handleChange}
                  placeholder="Masukkan email Anda"
                  className={`login-pengendara-input ${
                    state.isSubmitted && !state.inputs.email ? "error" : ""
                  }`}
                  disabled={state.sending}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="login-pengendara-input-group">
              <label className="login-pengendara-label">Password</label>
              <div className="login-pengendara-input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="login-pengendara-input-icon"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                <input
                  type="password"
                  name="password"
                  value={state.inputs.password}
                  onChange={handleChange}
                  placeholder="Masukkan password Anda"
                  className={`login-pengendara-input ${
                    state.isSubmitted && !state.inputs.password ? "error" : ""
                  }`}
                  disabled={state.sending}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="login-pengendara-button"
              disabled={state.sending}
            >
              {state.sending ? (
                <>
                  <span className="login-pengendara-spinner"></span>
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </button>

            {/* Register Link */}
            <div className="login-pengendara-footer">
              <p>
                Belum punya akun?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/pengendara/register")}
                  className="login-pengendara-link"
                  disabled={state.sending}
                >
                  Daftar Sekarang
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
