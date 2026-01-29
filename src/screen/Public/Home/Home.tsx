import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="scroll" id="home"></div>
      <div className="slideshow">
        <img
          className="d-block w-100"
          src="assets/img/Content/Image.png"
          alt="First slide"
        />
        <div className="quotes">
          <h1>Parkuy</h1>
          <h2>Digitalisasi Sistem Parkir</h2>
        </div>
        <div className="quotes2">
          <h1>Bingung Mau Parkir Dimana?</h1>
          <button
            className="button"
            onClick={() => navigate("/pengendara/location-search")}
          >
            <i className="fa fa-map-marker"></i> Cari Area Parkir
          </button>
        </div>
      </div>

      <div className="scroll" id="layanan"></div>
      <div className="layanan">
        <div className="title-layanan">
          <h1>Fokus Layanan Kami</h1>
        </div>
        <br />
        <div className="row">
          <div className="column">
            <img src="assets/img/Content/ilustrasi1.png" alt="" />
            <h2>Parkir di Bahu Jalan</h2>
            <p>Parkiran di bahu jalan terasa lebih nyaman dan aman.</p>
          </div>
          <div className="column">
            <img src="assets/img/Content/ilustrasi2.png" alt="" />
            <h2>Petugas Parkir</h2>
            <p>
              Petugas yang profesional dan memanfaatkan teknologi dalam
              pelayanannya.
            </p>
          </div>
          <div className="column">
            <img src="assets/img/Content/ilustrasi3.png" alt="" />
            <h2>Bayar Secara Cashless</h2>
            <p>
              Petugas akan menunjukkan QR Code dari QRIS dan bayar sesuai biaya
              parkir
            </p>
          </div>
        </div>
      </div>

      <div className="scroll" id="benefit"></div>
      <section className="wave">
        <div className="benefit">
          <div className="title-benefit">
            <h1>Jadi Petugas Parkir</h1>
          </div>
          <div className="text-benefit">
            <h1>Petugas Parkir</h1>
            <div className="image-button">
              <img src="assets/img/Content/benefit-parkir.png" alt="" />
              <br />
              <button className="button">Selengkapnya</button>
            </div>
          </div>
        </div>
        <br />
        <div className="curve"></div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <div className="scroll" id="download"></div>
      <div className="download">
        <img
          className="d-block w-100"
          src="assets/img/Content/download.png"
          alt="First slide"
        />
        <div className="title-download">
          <h1>Unduh Aplikasi Parkuy di</h1>
          <button className="button">
            <i className="fab fa-google-play"></i> Google Play
          </button>
        </div>
        <br />
      </div>
    </>
  );
};
export default Home;
